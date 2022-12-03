const express = require('express');
router = express.Router();
const auth = require('../controllers/Auth/basicAuth');


app.get('/logout',auth.logout);

module.exports=router;