const {Router} = require('express');
const {isolate} = require('../protect/organization')

const {createSchema, createUsandTeam, 
        createComplandTeam,createEmpStatandUpdate, 
        createInterandFeed} = require('../middlewares/create');

const {login, registerOrganization,createOrg,
        updateEmployee, getEmployees, getOneEmployee, deleteEmployee,
        addEmployeeData, addEmployeeStatus, addEmployeeAddress,
        addEmployeeMaritalStatus,createTeam,createInternalNotice, 
        getallNotices,removeNotice,getFeedbacks, removeFeedbacks,forgotPassword, resetPassword
        } = require('../../controllers/organization');


const router= Router();


router.post('/forgotPassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);


router.post('/login',login);

router.post('/register', registerOrganization);

router.post('/createorg', isolate,
        createSchema,  createUsandTeam, 
        createComplandTeam, createEmpStatandUpdate, 
        createInterandFeed, createOrg
);


router.post('/addEmployeeAddress', isolate, addEmployeeAddress)
router.post('/addEmployeeMaritalStatus', isolate, addEmployeeMaritalStatus)
router.post('/addEmployeeStatus', isolate, addEmployeeStatus)
router.post('/createTeam', isolate, createTeam)
// router.put('/updateUserMaritalStatus', isolate, updateMaritalStatus)
// router.put('/updateUserAddress', isolate, updateUserAddress)
// router.put('/updateUserStatus', isolate, updateUserStatus)


router.get('/getEmployees', isolate, getEmployees)
router.get('/getOneEmployee/:email', isolate, getOneEmployee)
router.put('/updateEmployee/:id',isolate, updateEmployee)
router.delete('/deleteEmployee/:id', isolate, deleteEmployee)


router.route('/internalnotice').
        post(isolate, createInternalNotice).
        get(isolate, getallNotices).
        delete(isolate, removeNotice);

router.route('/feedback').
        get(isolate, getFeedbacks).
        delete(isolate, removeFeedbacks);

router.post('/addEmployeeData', isolate, addEmployeeData);
module.exports= router;