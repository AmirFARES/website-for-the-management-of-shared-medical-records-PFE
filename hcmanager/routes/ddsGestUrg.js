const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/dds/gestUrg', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let ddsWilaya = req.ddsUser.wilayaId
        let sqlReq = `SELECT * FROM demandes WHERE wilayaId=${ddsWilaya} ORDER BY dateDeDemande`;
        db.query(sqlReq, (err, reqs) => {
            if (err) {
                throw err;
            } else {
                let sqlUrg = `SELECT * FROM profession WHERE role="3" AND wilayaId="${ddsWilaya}";`;
                db.query(sqlUrg, (err, rows) => {
                    if (err) {
                        throw err;
                    } else {
                        let sqlWilayas = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
                        db.query(sqlWilayas, (err, wilayas) => {
                            if (err) {
                                throw err;
                            } else {
                                res.render('assets/dds/ddsGestUrg', { reqs: reqs, rows: rows, wilayas: wilayas, erM: req.flash('erM'), suM: req.flash('suM') });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/dds/gestUrg/addUrg', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let emailDDS = req.ddsUser.email;
        let matricule = req.body.matricule;
        let wilayaId = req.body.wilayaId;
        let role = 3;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let numTelephone = req.body.numTelephone;
        let dateDeNaissance = req.body.dateDeNaissance;
        let dateDeRegistre = new Date();
        if(matricule.length==0||wilayaId.length==0||nom.length==0||prenom.length==0||numTelephone.length==0||dateDeNaissance.length==0){
            req.flash('erM','Veuillez remplir toutes les entrées!');
            res.redirect('/dds/gestUrg');
        }else{
            let sqlCheck = `SELECT * FROM profession WHERE matricule="${matricule}";`;
            db.query(sqlCheck, (err, check) => {
                if (err) {
                    throw err;
                } else {
                    if (check.length == 1) {
                        req.flash('erM','Ilya un profil avec cet matricule!');
                        res.redirect('/dds/gestUrg');
                    } else {
                        let sqlUrg = `INSERT INTO profession(matricule,wilayaId,role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS) VALUES("${matricule}","${wilayaId}","${role}","${nom}","${prenom}","${numTelephone}","${dateDeNaissance}","${dateDeRegistre.getFullYear()}-${dateDeRegistre.getMonth() + 1}-${dateDeRegistre.getDate()}","${emailDDS}");`;
                        db.query(sqlUrg, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                req.flash('suM','Un nouveau profil a été créé !');
                                res.redirect('/dds/gestUrg');
                            }
                        });
                    }
                }
            });
        }
    }
    else {
        res.redirect('/');
    }
})

app.get('/dds/gestUrg/getUrg', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let ddsWilaya = req.ddsUser.wilayaId
        let sqlReq = `SELECT * FROM demandes WHERE wilayaId=${ddsWilaya} ORDER BY dateDeDemande`;
        db.query(sqlReq, (err, reqs) => {
            if (err) {
                throw err;
            } else {

                let nom = req.query.nom;
                let prenom = req.query.prenom;
                let matricule = req.query.matricule;
                let dynamicNom = '%'.concat(nom.concat('%'));
                let dynamicPrenom = '%'.concat(prenom.concat('%'));
                let dynamicMatricule = '%'.concat(matricule.concat('%'));
                let sqlUrg = `SELECT * FROM profession WHERE wilayaId=${ddsWilaya} AND role="3" AND matricule LIKE "${dynamicMatricule}" AND nom LIKE "${dynamicNom}" AND prenom LIKE "${dynamicPrenom}";`;
                db.query(sqlUrg, (err, rows) => {
                    if (err) {
                        throw err;
                    } else {
                        let sqlWilayas = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
                        db.query(sqlWilayas, (err, wilayas) => {
                            if (err) {
                                throw err;
                            } else {
                                res.render('assets/dds/ddsGestUrg', { reqs: reqs, rows: rows, wilayas: wilayas, erM: req.flash('erM'), suM: req.flash('suM') });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/dds/gestUrg/profileUrg/:matricule', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let ddsWilaya = req.ddsUser.wilayaId
        let matricule = req.params.matricule;
        let sqlReq = `SELECT * FROM demandes WHERE wilayaId=${ddsWilaya} ORDER BY dateDeDemande`;
        db.query(sqlReq, (err, reqs) => {
            if (err) {
                throw err;
            } else {
                let sqlUrg = `SELECT profession.matricule AS matricule,profession.nom,profession.prenom,profession.numTelephone,profession.dateDeNaissance,profession.dateDeRegistre,photoprofession.photoPathProfession,accountproffesion.email,accountproffesion.password,profession.role
            FROM profession
            LEFT JOIN photoProfession ON profession.matricule=photoProfession.matricule
            LEFT JOIN accountProffesion ON profession.matricule=accountProffesion.matricule
            WHERE profession.wilayaId="${ddsWilaya}" AND profession.matricule="${matricule}";`;
                db.query(sqlUrg, (err, rows) => {
                    if (err) {
                        throw err;
                    } else {
                        res.render('assets/dds/ddsProfileUrg', { reqs: reqs, rows: rows });
                    }
                });

            }
        });

    }
    else {
        res.redirect('/');
    }
})

app.post('/dds/gestUrg/profileUrg/:matricule/editAcc',auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let matricule = req.params.matricule;
        let email = req.body.email;
        let password = req.body.password;
        let sqlGetAcc = `SELECT * from accountProffesion WHERE matricule="${matricule}";`;
        db.query(sqlGetAcc, async (err, acc) => {
            if (err) {
                throw err;
            } else {
                let newPassword = await bcrypt.hash(password,8);
                if (email.length == 0) { email = acc[0].email; }
                if (password.length == 0) { newPassword = acc[0].password; }
                let sqleditAcc = `UPDATE accountProffesion SET email="${email}",password="${newPassword}" WHERE matricule="${matricule}";`;
                db.query(sqleditAcc, (err, acc) => {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect(`/dds/gestUrg/profileUrg/${matricule}`);
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/dds/gestUrg/profileUrg/:matricule/deleteProfile', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let matricule = req.params.matricule;
        let sqlPhoto = `DELETE FROM photoProfession WHERE matricule="${matricule}";`;
        db.query(sqlPhoto, (err, result) => {
            if (err) {
                throw err;
            } else {
                let sqlAcc = `DELETE FROM accountProffesion WHERE matricule="${matricule}";`;
                db.query(sqlAcc, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        let sqlAcc = `DELETE FROM profession WHERE matricule="${matricule}";`;
                        db.query(sqlAcc, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.redirect('/dds/gestUrg');
                            }
                        });
                    }
                });

            }
        });
    }
    else {
        res.redirect('/');
    }
})


module.exports = router;