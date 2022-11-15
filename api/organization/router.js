const {Router} = require('express');
const {isolate} = require('../protect/organization')

const {createSchema, createUsandTeam, 
        createComplandTeam,createEmpStatandUpdate, 
        createInterandFeed} = require('../middlewares/create');

const {login, registerOrganization,createOrg,
        updateEmployee, getEmployees, getOneEmployee, deleteEmployee,
        addEmployeeData, addEmployeeStatus, addEmployeeAddress,
        addEmployeeMaritalStatus,createTeam,createInternalNotice, 
        getallNotices,removeNotice,getFeedbacks, removeFeedbacks
        } = require('../../controllers/organization');

const allowedFileTypes = require('../../utils/fileFilters')

const fileUpload = require('../../utils/uploadFile');

const router= Router();


router.post('/login',login);

router.post('/register', registerOrganization);

router.post('/createorg', isolate,
        createSchema,  createUsandTeam, 
        createComplandTeam, createEmpStatandUpdate, 
        createInterandFeed, createOrg
);

router.post('/addEmployeeData', isolate, 
        allowedFileTypes('jpeg', 'jpg', 'png'), 
        fileUpload.single('photo'), addEmployeeData);

router.post('/addEmployeeAddress', isolate, addEmployeeAddress)
router.post('/addEmployeeMaritalStatus', isolate, addEmployeeMaritalStatus)
router.post('/addEmployeeStatus', isolate, addEmployeeStatus)
router.post('/createTeam', isolate, createTeam)


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


module.exports= router;