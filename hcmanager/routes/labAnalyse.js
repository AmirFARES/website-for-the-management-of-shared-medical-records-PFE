const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/labAnalyse', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 4) {
        let myMatricule = req.userLog.matricule;
        let sqlAnalyse = `SELECT * FROM analyses WHERE matriculeLabAnalyse="${myMatricule}" AND etat="0";`;
        db.query(sqlAnalyse, async function (err, reqs) {
            if (err) {
                throw err;
            } else {
                res.render('assets/professionnel/labAnalyse/labAnalyseDash', { reqs: reqs });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/labAnalyse/oldAnalyses', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 4) {
        let myMatricule = req.userLog.matricule;
        let sqlAnlayse = `SELECT * FROM analyses WHERE matriculeLabAnalyse="${myMatricule}" AND etat="0";`;
        db.query(sqlAnlayse, async function (err, reqs) {
            if (err) {
                throw err;
            } else {
                let sqlOldAnlayse = `SELECT * FROM analyses WHERE matriculeLabAnalyse="${myMatricule}" AND etat="1";`;
                db.query(sqlOldAnlayse, async function (err, oldReqs) {
                    if (err) {
                        throw err;
                    } else {
                        res.render('assets/professionnel/labAnalyse/labOldAnalyses', { reqs: reqs, oldReqs: oldReqs });
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/labAnalyse/sendResult/:idAnalyse', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 4) {
        let myMatricule = req.userLog.matricule;
        let idAnalyse = req.params.idAnalyse;
        let resultat = req.body.resultat;
        let sqlSendAnlayse = `UPDATE analyses SET resultat="${resultat}",etat="1" WHERE idAnalyse="${idAnalyse}";`;
        db.query(sqlSendAnlayse, async function (err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect('/labAnalyse');
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/labAnalyse/myProfile', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 4) {
        let myMatricule = req.userLog.matricule;
        let sqlAnalyse = `SELECT * FROM analyses WHERE matriculeLabAnalyse="${myMatricule}" AND etat="0";`;
        db.query(sqlAnalyse, async function (err, reqs) {
            if (err) {
                throw err;
            } else {
                let sqlGetMyData = `SELECT profession.matricule,wilayaId,profession.role AS role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS,email,password,photoPathProfession
            FROM profession
            LEFT JOIN accountproffesion ON profession.matricule=accountproffesion.matricule
            LEFT JOIN photoprofession ON  profession.matricule=photoprofession.matricule
            WHERE profession.matricule="${myMatricule}";`;
                db.query(sqlGetMyData, async function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        res.render('assets/professionnel/labAnalyse/labAnalyseMyProfile', { rows: rows, reqs: reqs });
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/labAnalyse/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 4) {
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