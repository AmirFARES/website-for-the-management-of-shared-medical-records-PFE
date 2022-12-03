const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/centreImg',auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 5){
        let myMatricule=req.userLog.matricule;
    let sqlRadio = `SELECT * FROM radio WHERE matriculeLabImg="${myMatricule}" AND etat="0";`;
    db.query(sqlRadio, async function (err, reqs) {
        if(err){
            throw err;
        }else{
            res.render('assets/professionnel/centreImg/centreImgDash',{reqs:reqs});
        }
    });
    }
    else{
        res.redirect('/');
    }
})

app.get('/centreImg/oldRadios',auth.isLoggedInRole, function (req, res) {
   if(req.userLog && req.role == 5){
    let myMatricule=req.userLog.matricule;
    let sqlRadio = `SELECT * FROM radio WHERE matriculeLabImg="${myMatricule}" AND etat="0";`;
    db.query(sqlRadio, async function (err, reqs) {
        if(err){
            throw err;
        }else{
            let sqlOldRadio = `SELECT * FROM radio WHERE matriculeLabImg="${myMatricule}" AND etat="1";`;
            db.query(sqlOldRadio, async function (err, oldReqs) {
                if(err){
                    throw err;
                }else{
                    res.render('assets/professionnel/centreImg/centreOldImg',{reqs:reqs,oldReqs:oldReqs});
                }
            });
        }
    });
   }
   else{
       res.redirect('/');
   }
})

app.post('/centreImg/sendRadio/:idRadio',auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 5){
    let idRadio=req.params.idRadio;
    let resultat=req.body.resultat;
    let sqlSendAnlayse = `UPDATE radio SET radioFile="${resultat}",etat="1" WHERE idRadio="${idRadio}";`;
    db.query(sqlSendAnlayse, async function (err, result) {
        if(err){
            throw err;
        }else{
            res.redirect('/centreImg');
        }
    });
    }
    res.redirect('/');
})

app.get('/centreImg/myProfile',auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 5){
    let myMatricule=req.userLog.matricule;
    let sqlRadio = `SELECT * FROM radio WHERE matriculeLabImg="${myMatricule}" AND etat="0";`;
    db.query(sqlRadio, async function (err, reqs) {
        if(err){
            throw err;
        }else{
            let sqlGetMyData = `SELECT profession.matricule,wilayaId,profession.role AS role,nom,prenom,numTelephone,dateDeNaissance,dateDeRegistre,emailDDS,email,password,photoPathProfession
            FROM profession
            LEFT JOIN accountproffesion ON profession.matricule=accountproffesion.matricule
            LEFT JOIN photoprofession ON  profession.matricule=photoprofession.matricule
            WHERE profession.matricule="${myMatricule}";`;
            db.query(sqlGetMyData, async function (err, rows) {
                if(err){
                    throw err;
                }else{
                    res.render('assets/professionnel/centreImg/centreImgMyProfile',{rows:rows,reqs:reqs});
                }
            });
        }
    });
    }
    else{
        res.redirect('/');
    }
})

app.post('/centreImg/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 5) {
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

module.exports=router;