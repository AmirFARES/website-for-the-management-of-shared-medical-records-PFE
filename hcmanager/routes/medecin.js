const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/medecin', auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 1){
        res.redirect('/medecin/fileReq?nom=&prenom=&patientId=');
    }
    else{
        res.redirect('/');
    }
})

app.get('/medecin/createP',auth.isLoggedInRole,  function(req,res){
    if(req.userLog && req.role == 1){
        let sql = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
    db.query(sql, (err, wilayas) => {
        if (err) {
            throw err;
        }else{
            res.render('assets/professionnel/medecin/addMalade',{wilayas:wilayas});
        }
    });
    }
    else{
        res.redirect('/');
    }
})

app.get('/medecin/fileReq',auth.isLoggedInRole, function(req,res){
   if(req.userLog && req.role == 1){
    let nom = req.query.nom;
    let prenom = req.query.prenom;
    let patientId = req.query.patientId ;
    let dynamicNom = '%'.concat(nom.concat('%'));
    let dynamicPrenom = '%'.concat(prenom.concat('%'));
    let dynamicId = '%'.concat(patientId.concat('%'));
    db.query('SELECT * FROM malade WHERE nom like ? AND prenom like ? AND idMalade like?', [dynamicNom, dynamicPrenom, dynamicId], async function (err, rows) {
        res.render('assets/professionnel/medecin/patientsFilesFound', {rows:rows});
      });
   }
   else{
       res.redirect('/');
   }
})

app.get('/medecin/patient/:idMalade/donneesAdministratives',auth.isLoggedInRole,  function (req, res) {
    if(req.userLog && req.role == 1){
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
        }else{
            let sqlW1 = `SELECT * FROM dzwilayas WHERE wilaya_code="${malade[0].wilayaDeNais}"`;
            db.query(sqlW1, (err, W1) => {
                if (err) {
                    throw err;
                }else{
                    malade[0].wilayaDeNais=W1[0].wilayaFrName;
                    let sqlW2 = `SELECT * FROM dzwilayas WHERE wilaya_code="${malade[0].wilayaDom}"`;
                    db.query(sqlW2, (err, W2) => {
                        if (err) {
                            throw err;
                        }else{
                            let idWilayaDom=malade[0].wilayaDom;
                            malade[0].wilayaDom=W2[0].wilayaFrName;
                            let sql = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
                            db.query(sql, (err, wilayas) => {
                                if (err) {
                                    throw err;
                                }else{
                                    res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'donneesAdministratives',idMalade:idMalade,malade:malade,wilayas:wilayas,idWilayaDom:idWilayaDom});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    }
    else{
        res.redirect('/');
    }
})


app.get('/medecin/patient/:idMalade/syntheseMedicale',auth.isLoggedInRole, function(req,res){
    if(req.userLog && req.role == 1){
    let idMalade = req.params.idMalade;
    let sqlSynt = `SELECT dateDeSynthese,weight,height,alergies,listeDesProblems,listedDeInterventionsChirugicales,histodriqueDeLaPriseMedicamenteuse,implants,vaccinations,resumeDesExamensPratiques,historiqueSocial,profession.nom AS nomInf,profession.prenom AS prenomInf,idSynthese
    FROM synthesemedicale
    LEFT JOIN profession ON profession.matricule=synthesemedicale.matriculeInfirmier
    WHERE synthesemedicale.idMalade="${idMalade}"
    ORDER BY idSynthese DESC;`;
    db.query(sqlSynt, (err, synt) => {
        if (err) {
            throw err;
        }else{
            res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'syntheseMedicale',idMalade:idMalade,synt:synt});
        }
    });
    }
    else{
        res.redirect('/');
    }
})


app.get('/medecin/patient/:id/utilitaire',auth.isLoggedInRole, function(req,res){
   if(req.userLog && req.role == 1){
    let pId = req.params.id;
    let q = `SELECT * FROM consultation 
    LEFT JOIN profession ON matriculeMedecin=matricule
    WHERE idMalade = ${pId}
    ORDER BY idConsultation DESC`;
    db.query(q, async function (err, consultation) {
        if(consultation[0] == null){
            res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'utilitaire',consultation:null,idMalade:pId} );
        }
        else {
            res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'utilitaire',consultation:consultation,idMalade:pId} );
        }
    });
   }
   else {
       res.redirect('/');
   }
})

app.get('/medecin/patient/:idMalade/consultation/:idConsultation',auth.isLoggedInRole, function(req,res){
    if(req.userLog && req.role == 1){
        let idConsultation=req.params.idConsultation;
    let idMalade=req.params.idMalade;
    let slqConsult = `SELECT *
    FROM consultation
    LEFT JOIN profession ON matriculeMedecin=matricule
    WHERE idConsultation="${idConsultation}";`;
    db.query(slqConsult, async function (err, consultation) {
        if(err){
            throw err;
        }else{
            let slqTrait = `SELECT * FROM traitement WHERE idConsultation="${idConsultation}";`;
            db.query(slqTrait, async function (err, traitement) {
                if(err){
                    throw err;
                }else{
                    let slqAnalyses = `SELECT * FROM analyses
                    LEFT JOIN profession ON analyses.matriculeLabAnalyse=profession.matricule
                    WHERE idConsultation="${idConsultation}" AND etat="1";`;
                    db.query(slqAnalyses, async function (err, analyses) {
                        if(err){
                            throw err;
                        }else{
                            let slqRadio = `SELECT * FROM radio
                            LEFT JOIN profession ON radio.matriculeLabImg=profession.matricule
                            WHERE idConsultation="${idConsultation}" AND etat="1";`;
                            db.query(slqRadio, async function (err, radio) {
                                if(err){
                                    throw err;
                                }else{
                                    res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'consultation',idMalade:idMalade,consultation:consultation,traitement:traitement,analyses:analyses,radio:radio});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    }
    else{
        res.redirect('/');
    }
})

app.get('/medecin/patient/:idMalade/utilitaire/createCon',function(req,res){
    let idMalade = req.params.idMalade;
    let slqLabos = `SELECT * FROM profession WHERE role="4"`;
    db.query(slqLabos, async function (err, labos) {
        if(err){
            throw err;
        }else{
            let slqCentres = `SELECT * FROM profession WHERE role="5"`;
            db.query(slqCentres, async function (err, centres) {
                if(err){
                    throw err;
                }else{
                    
                    res.render('assets/professionnel/medecin/InfoDossierDeMalade',{categ:'createCon',idMalade:idMalade,labos:labos,centres:centres});
                }
            });
        }
    });
})

app.post('/medecin/patient/:idMalade/utilitaire/createCon',auth.isLoggedInRole, function(req,res){
    let idMalade = req.params.idMalade;
    let myMatricule = req.userLog.matricule;
    let dateDeConsult=new Date();
    let consultCom=req.body.consultCom;
    let tRaison=req.body.tRaison;
    let tMedicament=req.body.tMedicament;
    let tDosage=req.body.tDosage;
    let tCaution=req.body.tCaution;
    let analyseCom=req.body.analyseCom;
    let LabAnalyse=req.body.LabAnalyse;
    let radioCom=req.body.radioCom;
    let Centre=req.body.Centre;
    let slqConsult = `INSERT INTO consultation (matriculeMedecin,idMalade,dateDeConsult,Commentaire) VALUES("${myMatricule}","${idMalade}","${dateDeConsult.getFullYear()}-${dateDeConsult.getMonth() + 1}-${dateDeConsult.getDate()}","${consultCom}");`;
    db.query(slqConsult, async function (err, Consult) {
        if(err){
            throw err;
        }else{
            if (tMedicament !== undefined){
                if((typeof tMedicament)=="string"){
                    let slqTrait = `INSERT INTO traitement (idConsultation,nomDeMedicament,raisonDeTraitement,dosage,cautionAndUsage) VALUES("${Consult.insertId}","${tMedicament}","${tRaison}","${tDosage}","${tCaution}");`;
                    db.query(slqTrait, async function (err, result) {
                        if(err){
                            throw err;
                        }
                    });
                }else{
                    for(let i=0;i<tMedicament.length;i++){
                        let slqTrait = `INSERT INTO traitement (idConsultation,nomDeMedicament,raisonDeTraitement,dosage,cautionAndUsage) VALUES("${Consult.insertId[i]}","${tMedicament[i]}","${tRaison[i]}","${tDosage[i]}","${tCaution[i]}");`;
                        db.query(slqTrait, async function (err, result) {
                            if(err){
                                throw err;
                            }
                        });
                    }
                }
            }
            if (analyseCom !== undefined){
                if((typeof analyseCom)=="string"){
                    let slqAnalyse = `INSERT INTO analyses (idConsultation,matriculeLabAnalyse,commentaire,etat) VALUES("${Consult.insertId}","${LabAnalyse}","${analyseCom}","0");`;
                    db.query(slqAnalyse, async function (err, result) {
                        if(err){
                            throw err;
                        }
                    });
                }else{
                    for(let i=0;i<analyseCom.length;i++){
                        let slqAnalyse = `INSERT INTO analyses (idConsultation,matriculeLabAnalyse,commentaire,etat) VALUES("${Consult.insertId}","${LabAnalyse[i]}","${analyseCom[i]}","0");`;
                        db.query(slqAnalyse, async function (err, result) {
                            if(err){
                                throw err;
                            }
                        });
                    }
                }
            }
            if (radioCom !== undefined){
                if((typeof radioCom)=="string"){
                    let slqRadio = `INSERT INTO radio (idConsultation,matriculeLabImg,commentaire,etat) VALUES("${Consult.insertId}","${Centre}","${radioCom}","0");`;
                    db.query(slqRadio, async function (err, result) {
                        if(err){
                            throw err;
                        }
                    });
                }else{
                    for(let i=0;i<radioCom.length;i++){
                        let slqRadio = `INSERT INTO radio (idConsultation,matriculeLabImg,commentaire,etat) VALUES("${Consult.insertId}","${Centre[i]}","${radioCom[i]}","0");`;
                        db.query(slqRadio, async function (err, result) {
                            if(err){
                                throw err;
                            }
                        });
                    }
                }
            }
            res.redirect(`/medecin/patient/${idMalade}/consultation/${Consult.insertId}`);
        }
    });
    
})

app.get('/medecin/myProfile', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 1) {
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
                res.render('assets/professionnel/medecin/medecinMyProfile', { rows: rows });
            }
        });
    }
    else {
        res.redirect('/');
    }
})

app.post('/medecin/myProfile/editAcc', auth.isLoggedInRole, function (req, res) {
    if (req.userLog && req.role == 1) {
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

app.get('/medecin/logout',auth.logout);

module.exports=router;
