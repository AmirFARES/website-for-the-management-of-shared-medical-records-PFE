const dbServices = require('../dbServices');
const db = dbServices.db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.query;
        function auuth(table, link, role) {
            if (!email || !password) {
                req.flash('erM','Invalid credentials !');
                return res.status(400).redirect('/');
            }
            db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async function (err, result) {
                if (!result[0] || !(await bcrypt.compare(password, result[0].password))|| role != result[0].role) {
                    req.flash('erM','Invalid credentials !');
                    res.status(401).redirect('/');
                }
                else {
                    let email = result[0].email;
                    if (!role) {
                        const token = jwt.sign({ email , role:0}, process.env.JWT_SECRET, {
                            expiresIn: process.env.EXPIRES_IN
                        })
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.CookieEx * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).redirect(`${link}`);
                    }
                    else {
                        let thisrole = result[0].role;
                        const token = jwt.sign({ email:email, role:thisrole }, process.env.JWT_SECRET, {
                            expiresIn: process.env.EXPIRES_IN
                        })
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.CookieEx * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).redirect(`${link}`);
                    }
                }
            })
        }
        if (!role) {
            auuth('dds', '/dds');
        }
        else {
            if (role == 1) {
                auuth('accountProffesion', '/medecin', 1);
            }
            else if (role == 2) {
                auuth('accountProffesion', '/inf', 2);
            }
            else if (role == 3) {
                auuth('accountProffesion', '/emergency', 3);
            }
            else if (role == 4) {
                auuth('accountProffesion', '/labAnalyse', 4);
            }
            else if (role == 5) {
                auuth('accountProffesion', '/centreImg', 5);
            }
            else {
                auuth('accountProffesion', '/pha', 6);
            }
        }
    } catch (error) {
    }
}


exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query('SELECT * FROM dds where email = ?', [decoded.email], (err, result) => {
                if (!result) {
                    return next();
                }
                req.ddsUser = result[0];
                req.role = 0;
                return next();
            })
        } catch (error) {
        }
    }
    else {
        next();
    }
}
exports.isLoggedInRole = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query(`SELECT * FROM accountProffesion where email = ?`, [decoded.email], (err, result) => {
                if (!result) {
                    return next();
                }
                if(result[0]){
                    req.userLog = result[0];
                    req.role = result[0].role;
                    req.matricule = result[0].matricule;
                    return next();
                }
                else{
                    req.role = 0;
                    req.userLog = undefined;
                }
            })
        } catch (error) {
        }
    }
    else {
        next();
    }
}


exports.logout = async(req, res) =>{
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()+ 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}