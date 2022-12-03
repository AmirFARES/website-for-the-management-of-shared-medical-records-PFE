const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/inf', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let sqlMalade = `SELECT * FROM malade;`;
        db.query(sqlMalade, async function (err, malade) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/infirmier/infDash', { malade: malade });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/inf/getPatients', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let idMalade = req.query.idMalade;
        let prenom = req.query.prenom;
        let nom = req.query.nom;
        let dynamicNom = '%'.concat(nom.concat('%'));
        let dynamicPrenom = '%'.concat(prenom.concat('%'));
        let dynamicIdMalade = '%'.concat(idMalade.concat('%'));
        let sqlMalade = `SELECT * FROM malade WHERE idMalade LIKE "${dynamicIdMalade}" AND nom LIKE "${dynamicNom}" AND prenom LIKE "${dynamicPrenom}";`;
        db.query(sqlMalade, (err, malade) => {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/infirmier/infDash', { malade: malade });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/inf/patientFile/:idMalade', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let idMalade = req.params.idMalade;
        let sqlMalade = `SELECT * FROM malade WHERE idMalade="${idMalade}";`;
        db.query(sqlMalade, async function (err, malade) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/infirmier/patientFile', { malade: malade });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/inf/patientFile/:idMalade/donneesAdministratives', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let idMalade = req.params.idMalade;
        let sqlMalade = `SELECT malade.idMalade,malade.nom,malade.prenom,malade.dateDeNaissance,sexe,dateCreationDossier,profession.nom AS nomUrg,profession.prenom AS prenomUrg,adressedenaissance.wilaya AS wilayaDeNais,adressedenaissance.daira AS dairaDeNais,adressedenaissance.commune AS communeDeNais,adresse.wilaya AS wilayaDom,adresse.daira AS dairaDom,adresse.commune AS communeDom,adresse.quartie AS quartieDom,phonenummalade.phoneNum AS phoneNum
    FROM malade
    LEFT JOIN adresseDeNaissance ON malade.adresseNaissanceId=adressedenaissance.adresseNaissanceId
    LEFT JOIN adresse ON malade.adresseId=adresse.adresseId
    LEFT JOIN phoneNumMalade ON malade.idMalade=phoneNumMalade.idMalade
    LEFT JOIN profession ON malade.matriculeDurgence=profession.matricule
    WHERE malade.idMalade="${idMalade}";`;
        db.query(sqlMalade, (err, malade) => {
            if (err) {
                throw err;
            } else {
                let sqlW1 = `SELECT * FROM dzwilayas WHERE wilaya_code="${malade[0].wilayaDeNais}"`;
                db.query(sqlW1, (err, W1) => {
                    if (err) {
                        throw err;
                    } else {
                        malade[0].wilayaDeNais = W1[0].wilayaFrName;
                        let sqlW2 = `SELECT * FROM dzwilayas WHERE wilaya_code="${malade[0].wilayaDom}"`;
                        db.query(sqlW2, (err, W2) => {
                            if (err) {
                                throw err;
                            } else {
                                malade[0].wilayaDom = W2[0].wilayaFrName;
                                res.render('assets/professionnel/infirmier/patientFile', { categ: 'donneesAdministratives', idMalade: idMalade, malade: malade });

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

app.get('/inf/patientFile/:idMalade/syntheseMedicales', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let idMalade = req.params.idMalade;
        let sqlSynt = `SELECT dateDeSynthese,weight,height,alergies,listeDesProblems,listedDeInterventionsChirugicales,histodriqueDeLaPriseMedicamenteuse,implants,vaccinations,resumeDesExamensPratiques,historiqueSocial,profession.nom AS nomInf,profession.prenom AS prenomInf,idSynthese
    FROM synthesemedicale
    LEFT JOIN profession ON profession.matricule=synthesemedicale.matriculeInfirmier
    WHERE synthesemedicale.idMalade="${idMalade}"
    ORDER BY idSynthese DESC;`;
        db.query(sqlSynt, (err, synt) => {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/infirmier/patientFile', { categ: 'syntheseMedicales', idMalade: idMalade, synt: synt });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/inf/patientFile/:idMalade/syntheseMedicales/addSynt', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
        let matriculeInf = req.userLog.matricule;
        let idMalade = req.params.idMalade;
        let dateDeSynthese = new Date();
        let weight = req.body.weight;
        let height = req.body.height;
        let alergies = req.body.alergies;
        let listeDesProblems = req.body.listeDesProblems;
        let listedDeInterventionsChirugicales = req.body.listedDeInterventionsChirugicales;
        let histodriqueDeLaPriseMedicamenteuse = req.body.histodriqueDeLaPriseMedicamenteuse;
        let implants = req.body.implants;
        let vaccinations = req.body.vaccinations;
        let resumeDesExamensPratiques = req.body.resumeDesExamensPratiques;
        let historiqueSocial = req.body.historiqueSocial;
        let sqlSynt = `INSERT INTO syntheseMedicale (idMalade,matriculeInfirmier,dateDeSynthese,weight,height,alergies,listeDesProblems,listedDeInterventionsChirugicales,histodriqueDeLaPriseMedicamenteuse,implants,vaccinations,resumeDesExamensPratiques,historiqueSocial) VALUES("${idMalade}","${matriculeInf}","${dateDeSynthese.getFullYear()}-${dateDeSynthese.getMonth() + 1}-${dateDeSynthese.getDate()}","${weight}","${height}","${alergies}","${listeDesProblems}","${listedDeInterventionsChirugicales}","${histodriqueDeLaPriseMedicamenteuse}","${implants}","${vaccinations}","${resumeDesExamensPratiques}","${historiqueSocial}");`;
        db.query(sqlSynt, (err, synt) => {
            if (err) {
                throw err;
            } else {
                res.redirect(`/inf/patientFile/${idMalade}/syntheseMedicales`);
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/inf/myProfile', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
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
                res.render('assets/professionnel/infirmier/infMyProfile', { rows: rows });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/inf/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 2) {
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