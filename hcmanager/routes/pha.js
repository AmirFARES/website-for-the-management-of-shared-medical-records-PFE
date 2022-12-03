const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/pha', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 6) {
        let sqlConsultation = `SELECT malade.nom AS nomMalade,malade.prenom AS prenomMalade,idConsultation,dateDeConsult,profession.nom AS nomMed,profession.prenom AS prenomMed
    FROM consultation
    LEFT JOIN malade ON consultation.idMalade=malade.idMalade
    LEFT JOIN profession ON consultation.matriculeMedecin=profession.matricule
    ORDER BY idConsultation DESC;`;
        db.query(sqlConsultation, async function (err, consultation) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/pha/phaDash', { consultation: consultation });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/pha/getConsultations', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 6) {
        let idConsultation = req.query.idConsultation;
        let dynamicIdConsultation = '%'.concat(idConsultation.concat('%'));
        let sqlConsultation = `SELECT malade.nom AS nomMalade,malade.prenom AS prenomMalade,idConsultation,dateDeConsult,profession.nom AS nomMed,profession.prenom AS prenomMed
    FROM consultation
    LEFT JOIN malade ON consultation.idMalade=malade.idMalade
    LEFT JOIN profession ON consultation.matriculeMedecin=profession.matricule
    WHERE idConsultation LIKE"${dynamicIdConsultation}"
    ORDER BY idConsultation DESC;`;
        db.query(sqlConsultation, async function (err, consultation) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/pha/phaDash', { consultation: consultation });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/pha/ord/:idConsultation', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 6) {
        let idConsultation = req.params.idConsultation;
        let sqlTraitement = `SELECT * FROM traitement WHERE idConsultation="${idConsultation}";`;
        db.query(sqlTraitement, async function (err, trait) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/pha/phaOrd', { trait: trait });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/pha/myProfile', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 6) {
        let myMatricule = req.userLog.matricule;
        let sqlGetMyData = `SELECT profession.matricule,wilayaId,profession.role AS role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS,email,password,photoPathProfession
    FROM profession
    LEFT JOIN accountproffesion ON profession.matricule=accountproffesion.matricule
    LEFT JOIN photoprofession ON  profession.matricule=photoprofession.matricule
    WHERE profession.matricule="${myMatricule}";`;
        db.query(sqlGetMyData, async function (err, rows) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/pha/phaMyProfile', { rows: rows });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/pha/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 6) {
        let myMatricule = req.matricule;
        let numTelephone = req.body.numTelephone;
        let email = req.body.email;
        let password = req.body.password;
        let picture = req.body.picture;
        let sqlGetMyData = `SELECT profession.matricule,wilayaId,profession.role AS role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS,email,password,photoPathProfession
        FROM profession
        LEFT JOIN accountproffesion ON profession.matricule=accountproffesion.matricule
        LEFT JOIN photoprofession ON  profession.matricule=photoprofession.matricule
        WHERE profession.matricule="${myMatricule}";`;
        db.query(sqlGetMyData, async function (err, acc) {
            if (err) {
                throw err;
            } else {
                if (numTelephone.length == 0) { numTelephone = acc[0].numTelephone }
                let newPassword = await bcrypt.hash(password,8);
                let sqlEdit = `UPDATE profession SET numTelephone="${numTelephone}" WHERE matricule="${myMatricule}";`;
                db.query(sqlEdit, async function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        if (password.length == 0) { newPassword = acc[0].password }
                        if (email.length == 0) { email = acc[0].email }
                        let sqlEdit2 = `UPDATE accountProffesion SET email="${email}",password="${newPassword}" WHERE matricule="${myMatricule}";`;
                        db.query(sqlEdit2, async function (err, result) {
                            if (err) {
                                throw err;
                            } else {
                                if (picture.length != 0) {
                                    let sqlGetPic = `SELECT * FROM photoProfession WHERE matricule="${myMatricule}";`;
                                    db.query(sqlGetPic, async function (err, Pics) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            if (Pics.length == 0) {
                                                let sqlCreatePic = `INSERT INTO photoProfession (photoPathProfession,matricule) VALUES("${picture}","${myMatricule}");`;
                                                db.query(sqlCreatePic, async function (err, result) {
                                                    if (err) {
                                                        throw err;
                                                    } else {
                                                        res.redirect('/logout');
                                                    }
                                                });
                                            } else {
                                                let sqlEdit3 = `UPDATE photoProfession SET photoPathProfession="${picture}" WHERE matricule="${myMatricule}";`;
                                                db.query(sqlEdit3, async function (err, result) {
                                                    if (err) {
                                                        throw err;
                                                    } else {
                                                        res.redirect('/logout');
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    res.redirect('/logout');
                                }

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