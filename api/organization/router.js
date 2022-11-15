const {Router} = require('express');
const {createSchema, createUsandTeam, createComplandTeam,createEmpStatandUpdate, createInterandFeed} = require('../middlewares/create')
const {isolate} = require('../protect/organization')
const router= Router();
const format = require('pg-format');



const {login, registerOrganization,createOrg, updateEmployee, getEmployees, getOneEmployee, deleteEmployee,addEmployeeData, addEmployeeStatus, addEmployeeAddress,addEmployeeMaritalStatus,createTeam} = require('../../controllers/organization');
const { route } = require('../../loaders/app');
const pool =require('../../config/dbconfig');

const { AppError } = require('../../utils/ErrorHandler');
router.post('/login',login);

router.post('/register', registerOrganization);

router.post('/createorg', isolate,
        createSchema,  createUsandTeam, 
        createComplandTeam, createEmpStatandUpdate, 
        createInterandFeed, createOrg
);

router.get('/getTame',isolate, async (req, res, next)=>{

        try {
                
                const result = await pool.query(`Select * from users;`);
                console.log(result.rows)
                return res.status(200).json({
                        data : result.rows
        })
                
        } catch (error) {
                next(error)
     get           
        }
       
})

router.post('/addEmployeeData', isolate, addEmployeeData)
router.post('/addEmployeeAddress', isolate, addEmployeeAddress)
router.post('/addEmployeeMaritalStatus', isolate, addEmployeeMaritalStatus)
router.post('/addEmployeeStatus', isolate, addEmployeeStatus)
router.post('/createTeam', isolate, createTeam)


router.get('/getEmployees', isolate, getEmployees)
router.get('/getOneEmployee', isolate, getOneEmployee)
router.put('/updateEmployee/:id',isolate, updateEmployee)
router.delete('/deleteEmployee/:id', isolate, deleteEmployee)


module.exports= router;