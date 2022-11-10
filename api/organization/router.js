const {Router} = require('express');

const router= Router();


const {login, createOrganization} = require('../../controllers/organization')
router.post('/login',login);
// router.post('/register/organization', createOrganization);


module.exports= router;