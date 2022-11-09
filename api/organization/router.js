const {Router} = require('express');
const router= Router();


const {login} = require('../../controllers')
router.get('/login',login);

module.exports= router;