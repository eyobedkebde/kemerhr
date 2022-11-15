const {Router} = require('express');

const {isolateOrgAndUser} = require('../protect/employee');

const router= Router();


const {login, complain, feedback, deleteComplain,
    getMycomplains} = require('../../controllers/employee')

router.post('/login',login);

router.route('/complain').
    get(isolateOrgAndUser, getMycomplains).
    post(isolateOrgAndUser, complain).
    delete(isolateOrgAndUser, deleteComplain)

router.route('/feedback').post(isolateOrgAndUser, feedback);

module.exports= router;

