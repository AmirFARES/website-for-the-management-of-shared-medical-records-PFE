const express = require('express');
const { date } = require('faker');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
let bcrypt = require('bcryptjs');
let auth = require('../controllers/Auth/basicAuth');

router.get('/',(req,res)=>{
    let sql = `SELECT wilaya_code,wilayaFrName FROM DZWilayas;`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }else{
            res.render('home',{wilayas:result,er:null,sucs:null,erM:req.flash('erM'),suM:req.flash('suM')});
        }
    });
})

router.post('/ProSignUp',(req,res)=>{
    let matricule = req.body.matricule;
    let numTelephone = req.body.numTelephone;
    let email = req.body.email;
    let password = req.body.password;
    let dateDeDemande = new Date();
    let wilayaId = req.body.wilayaId;
    let role = req.body.role;
    if(matricule.length==0||numTelephone.length==0||email.length==0||password.length==0){
        req.flash('erM','Veuillez remplir toutes les entrées!');
        res.redirect('/');
    }else{
        let sqlD = `SELECT * FROM demandes WHERE matricule="${matricule}";`;
        db.query(sqlD, async (err, resultD) => {
            if (err) {
                throw err;
            }else{
                if(resultD.length!=0){
                    req.flash('erM','il y a une demande avec cet matricule!');
                    res.redirect('/');
                }else{
                    let sqlA = `SELECT * FROM accountproffesion WHERE matricule="${matricule}";`;
                    db.query(sqlA, async (err, resultA) => {
                        if (err) {
                            throw err;
                        }else{
                            if(resultA.length!=0){
                                req.flash('erM','il y a un compt avec cet matricule!');
                                res.redirect('/');
                            }else{
                                let hashedPass = await bcrypt.hash(password, 8);
                                let sqlAddDemande = `INSERT INTO demandes (matricule,numTelephone,email,password,dateDeDemande,wilayaId,role) VALUES ("${matricule}","${numTelephone}","${email}","${hashedPass}","${dateDeDemande.getFullYear()}-${dateDeDemande.getMonth()+1}-${dateDeDemande.getDate()}","${wilayaId}","${role}");`;
                                db.query(sqlAddDemande, (err, result) => {
                                    if (err) {
                                        throw err;
                                    }else{
                                        req.flash('suM','votre demande a été envoyée!');
                                        res.redirect('/');
                                    }
                                });
                            }
                        }
                    });
                            
                }
            }
        });
    }
    
})


router.get('/ProLogin', auth.login);

module.exports=router;