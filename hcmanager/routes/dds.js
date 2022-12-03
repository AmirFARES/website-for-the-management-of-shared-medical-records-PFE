const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/ddsLogin', auth.login);

app.get('/dds', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let wilayaId = req.ddsUser.wilayaId;
        let sql = `SELECT * FROM demandes WHERE wilayaId=${wilayaId} ORDER BY dateDeDemande`;
        db.query(sql, async function (err, reqs) {
            if (err) {
                throw err;
            } else {
                res.render('assets/dds/ddsDash', { reqs: reqs,erM:req.flash('erM'),suM:req.flash('suM')});
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.get('/dds/checkDemande/:matricule', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let wilayaId = req.ddsUser.wilayaId;
        let matricule = req.params.matricule;
        let sqlDemande = `SELECT * FROM demandes WHERE wilayaId=${wilayaId} AND matricule="${matricule}";`;
        db.query(sqlDemande, function (err, reqs) {
            if (err) {
                throw err;
            } else {
                let numTelephone = reqs[0].numTelephone;
                let sqlCheck = `SELECT * FROM profession WHERE wilayaId=${wilayaId} AND matricule="${matricule}" AND numTelephone="${numTelephone}";`;
                db.query(sqlCheck, async function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        if (rows.length == 1) {
                            let sqlAddAcc = `INSERT INTO accountProffesion (email,password,matricule,role) VALUES("${reqs[0].email}","${reqs[0].password}","${matricule}","${reqs[0].role}");`;
                            db.query(sqlAddAcc, async function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    let sqlDeleteDemande = `DELETE FROM demandes WHERE matricule="${matricule}";`;
                                    db.query(sqlDeleteDemande, async function (err, result) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            req.flash('suM','La demande est valide!');
                                            res.redirect('/dds');
                                        }
                                    });
                                }
                            });
                        } else {
                            let sqlDeleteDemande = `DELETE FROM demandes WHERE matricule="${matricule}";`;
                            db.query(sqlDeleteDemande, async function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    req.flash('erM',`La demande n'est pas valide!`);
                                    res.redirect('/dds');
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    else {
        res.redirect('/');
    }

})

app.get('/dds/myProfile', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let email = req.ddsUser.email;
        let wilayaId = req.ddsUser.wilayaId;
        let sql = `SELECT * FROM demandes WHERE wilayaId=${wilayaId} ORDER BY dateDeDemande`;
        db.query(sql, async function (err, reqs) {
            if (err) {
                throw err;
            } else {
                let sqlMyData = `SELECT * FROM dds WHERE email="${email}";`;
                db.query(sqlMyData, async function (err, myData) {
                    if (err) {
                        throw err;
                    } else {
                        let sqlMyData = `SELECT * FROM dzwilayas WHERE wilaya_code="${myData[0].wilayaId}";`;
                        db.query(sqlMyData, async function (err, myWilaya) {
                            if (err) {
                                throw err;
                            } else {
                                res.render('assets/dds/ddsMyProfile', { myData: myData, myWilaya: myWilaya, reqs: reqs });
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

app.post('/dds/myProfile/editAcc', auth.isLoggedIn, function (req, res) {
    if (req.ddsUser) {
        let emailDDs = req.ddsUser.email;
        let numTelephone = req.body.numTelephone;
        let newEmail = req.body.email;
        let password = req.body.password;
        

        let sqlAcc = `SELECT * FROM dds WHERE email="${emailDDs}";`;
        db.query(sqlAcc, async function (err, acc) {
            if (err) {
                throw err;
            } else {
                let newPassword = await bcrypt.hash(password,8);
                if (numTelephone.length == 0) { numTelephone = acc[0].numTelephone }
                if (password.length == 0) { newPassword = acc[0].password }
                let sqlEdit = `UPDATE dds SET numTelephone="${numTelephone}",password="${newPassword}" WHERE email="${emailDDs}";`;
                db.query(sqlEdit, async function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        if (newEmail.length == 0 || newEmail == emailDDs) {
                            res.redirect('/logout');
                        } else {
                            let sqlGetOldDDS = `SELECT * FROM dds WHERE email="${emailDDs}";`;
                            db.query(sqlGetOldDDS, async function (err, oldDDS) {
                                if (err) {
                                    throw err;
                                } else {
                                    let sqlAddDDS = `INSERT INTO dds (email,password,wilayaId,nom,prenom,numTelephone) VALUES("${newEmail}","${newPassword}","${oldDDS[0].wilayaId}","${oldDDS[0].nom}","${oldDDS[0].prenom}","${oldDDS[0].numTelephone}");`;
                                    db.query(sqlAddDDS, async function (err, newDDS) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            let sqlEditProf = `UPDATE profession SET emailDDS="${newEmail}" WHERE emailDDS="${emailDDs}";`;
                                            db.query(sqlEditProf, async function (err, result) {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    let sqlEditProf = `DELETE FROM dds WHERE email="${emailDDs}";`;
                                                    db.query(sqlEditProf, async function (err, result) {
                                                        if (err) {
                                                            throw err;
                                                        } else {
                                                            res.redirect('/logout');
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
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

module.exports = router;