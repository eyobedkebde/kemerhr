const {Router} = require('express');
const {isolate} = require('../protect/organization')

const {createSchema, createUsandTeam, 
        createComplandTeam,createEmpStatandUpdate, 
        createInterandFeed} = require('../middlewares/create');

const {login, registerOrganization,createOrg, 
        createInternalNotice, getallNotices,removeNotice,
        getFeedbacks, removeFeedbacks} = require('../../controllers/organization')

const router= Router();

router.post('/login',login);

router.post('/register', registerOrganization);

router.post('/createorg', isolate,
        createSchema,  createUsandTeam, 
        createComplandTeam, createEmpStatandUpdate, 
        createInterandFeed, createOrg
);

router.route('/internalnotice').
        post(isolate, createInternalNotice).
        get(isolate, getallNotices).
        delete(isolate, removeNotice);

router.route('/feedback').
        get(isolate, getFeedbacks).
        delete(isolate, removeFeedbacks);

module.exports= router;