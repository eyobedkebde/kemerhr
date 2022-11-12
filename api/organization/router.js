const {Router} = require('express');
const {createSchema, createUsandTeam, createComplandTeam,createEmpStatandUpdate, createInterandFeed} = require('../middlewares/create')
const {isolate} = require('../protect/organization')
const router= Router();


const {login, registerOrganization,createOrg} = require('../../controllers/organization')

router.post('/login',login);

router.post('/register', registerOrganization);

router.post('/createorg', isolate,
        createSchema,  createUsandTeam, 
        createComplandTeam, createEmpStatandUpdate, 
        createInterandFeed, createOrg
);


module.exports= router;