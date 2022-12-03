const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/emergency', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        res.redirect('/emergency/fileReq?nom=&prenom=&patientId=');
    }
    else {
        res.redirect('/');
    }
})

app.get('/emergency/createP', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        let sql = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
        db.query(sql, (err, wilayas) => {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/urgence/addMalade', { wilayas: wilayas });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/emergency/newPatient', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        let myMatricule = req.userLog.matricule;
        let nomMalade = req.body.nom;
        let prenomMalade = req.body.prenom;
        let dateDeNaissance = req.body.dateDeNaissance;
        let wilayaNaissance = req.body.wilayaNaissance;
        let dairaNaissance = req.body.dairaNaissance;
        let communeNaissance = req.body.communeNaissance;
        let wilayaDomicile = req.body.wilayaDomicile;
        let dairaDomicile = req.body.dairaDomicile;
        let communeDomicile = req.body.communeDomicile;
        let quartierDomicile = req.body.quartierDomicile;
        let sexe = req.body.sexe;
        let phoneNums = req.body.numPhone;
        if (nomMalade.length == 0 || prenomMalade.length == 0 || dateDeNaissance.length == 0 || wilayaNaissance.length == 0 || dairaNaissance.length == 0 || communeNaissance.length == 0 || wilayaDomicile.length == 0 || dairaDomicile.length == 0 || communeDomicile.length == 0 || quartierDomicile.length == 0 || sexe.length == 0) {
            req.flash('erM', 'Veuillez remplir toutes les entrées!');
            res.redirect('/emergency');
        } else {
            let sqlAdresseNaissance = `INSERT INTO adressedenaissance(wilaya,daira,commune) VALUES("${wilayaNaissance}","${dairaNaissance}","${communeNaissance}");`;
            db.query(sqlAdresseNaissance, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    let sqlAdresse = `INSERT INTO adresse(wilaya,daira,commune,quartie) VALUES("${wilayaDomicile}","${dairaDomicile}","${communeDomicile}","${quartierDomicile}");`;
                    db.query(sqlAdresse, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            let sqlGetadresseNaissanceId = `SELECT adresseNaissanceId FROM adressedenaissance WHERE wilaya='${wilayaNaissance}' AND daira='${dairaNaissance}' AND commune='${communeNaissance}' ORDER BY adresseNaissanceId DESC;`;
                            db.query(sqlGetadresseNaissanceId, (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    adresseNaissanceId = result[0].adresseNaissanceId;
                                    let sqlGetadresseId = `SELECT adresseId FROM adresse WHERE wilaya='${wilayaDomicile}' AND daira='${dairaDomicile}' AND commune='${communeDomicile}' AND quartie='${quartierDomicile}' ORDER BY adresseId DESC;`;
                                    db.query(sqlGetadresseId, (err, result) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            adresseId = result[0].adresseId;
                                            let sqlmalade = `INSERT INTO malade (nom, prenom, dateDeNaissance, adresseNaissanceId, adresseId, sexe, dateCreationDossier,matriculeDurgence) VALUES ("${nomMalade}", "${prenomMalade}", "${dateDeNaissance}", "${adresseNaissanceId}", "${adresseId}", "${sexe}", curdate(),"${myMatricule}");`;
                                            db.query(sqlmalade, (err, result) => {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    let sqlGetMaladeId = `SELECT idMalade FROM malade WHERE nom='${nomMalade}' AND prenom='${prenomMalade}' AND dateDeNaissance='${dateDeNaissance}' AND adresseNaissanceId='${adresseNaissanceId}' ORDER BY idMalade DESC;`;
                                                    db.query(sqlGetMaladeId, (err, result) => {
                                                        if (err) {
                                                            throw err;
                                                        } else {
                                                            idMalade = result[0].idMalade;
                                                            if (phoneNums !== undefined) {
                                                                for (let i = 0; i < phoneNums.length; i++) {
                                                                    let sqlphone = `INSERT INTO phoneNumMalade (phoneNum,idMalade) VALUES ("${phoneNums[i]}", "${idMalade}");`;
                                                                    db.query(sqlphone, (err, result) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                            res.redirect(`/emergency`);
                                                        }

                                                    });

                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    else {
        res.redirect('/');
    }
})

app.get('/emergency/fileReq', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        let nom = req.query.nom;
        let prenom = req.query.prenom;
        let patientId = req.query.patientId;
        let dynamicNom = '%'.concat(nom.concat('%'));
        let dynamicPrenom = '%'.concat(prenom.concat('%'));
        let dynamicId = '%'.concat(patientId.concat('%'));
        db.query('SELECT * FROM malade WHERE nom like ? AND prenom like ? AND idMalade like?', [dynamicNom, dynamicPrenom, dynamicId], async function (err, rows) {
            res.render('assets/professionnel/urgence/patientsFilesFound', { rows: rows, erM: req.flash('erM') });
        });
    }
    else {
        res.redirect('/');
    }
});

app.get('/emergency/patient/:idMalade/donneesAdministratives', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
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
                                let idWilayaDom = malade[0].wilayaDom;
                                malade[0].wilayaDom = W2[0].wilayaFrName;
                                let sql = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
                                db.query(sql, (err, wilayas) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        res.render('assets/professionnel/urgence/InfoDossierDeMalade', { categ: 'donneesAdministratives', idMalade: idMalade, malade: malade, wilayas: wilayas, idWilayaDom: idWilayaDom });
                                    }
                                });
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


app.post('/emergency/patient/:idMalade/edit', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        let idMalade = req.params.idMalade;
        let newWilaya = req.body.wilayaDomicile;
        let newDaira = req.body.dairaDomicile;
        let newCommune = req.body.communeDomicile;
        let newQuartie = req.body.quartierDomicile;
        let sql = `SELECT * FROM malade WHERE idMalade="${idMalade}";`;
        db.query(sql, (err, malade) => {
            if (err) {
                throw err;
            } else {
                let sqlAdresse = `SELECT * FROM adresse WHERE adresseId="${malade[0].adresseId}";`;
                db.query(sqlAdresse, (err, adresse) => {
                    if (err) {
                        throw err;
                    } else {
                        if (newDaira == adresse[0].daira || newDaira.length == 0) { newDaira = adresse[0].daira; }
                        if (newCommune == adresse[0].commune || newCommune.length == 0) { newCommune = adresse[0].commune; }
                        if (newQuartie == adresse[0].quartie || newQuartie.length == 0) { newQuartie = adresse[0].quartie; }
                        let sqlUpd = `UPDATE adresse SET wilaya="${newWilaya}",daira="${newDaira}",commune="${newCommune}",quartie="${newQuartie}" WHERE adresseId="${malade[0].adresseId}";`;
                        db.query(sqlUpd, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.redirect(`/emergency/patient/${idMalade}/donneesAdministratives`);
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

app.get('/emergency/myProfile', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
        let myMatricule = "INF1";
        let sqlGetMyData = `SELECT profession.matricule,wilayaId,profession.role AS role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS,email,password,photoPathProfession
    FROM profession
    LEFT JOIN accountproffesion ON profession.matricule=accountproffesion.matricule
    LEFT JOIN photoprofession ON  profession.matricule=photoprofession.matricule
    WHERE profession.matricule="${myMatricule}";`;
        db.query(sqlGetMyData, async function (err, rows) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/urgence/urgenceMyProfile', { rows: rows });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/emergency/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 3) {
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
                let newPassword = await bcrypt.hash(password, 8);
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