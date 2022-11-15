const {Router} = require('express');

const {isolateOrgAndUser} = require('../protect/employee');

const router= Router();
const allowedFileTypes = require('../../utils/fileFilters')

const fileUpload = require('../../utils/uploadFile');

const {login, complain, feedback, deleteComplain,
    getMycomplains, forgotPassword, resetPassword} = require('../../controllers/employee')

router.post('/login',login);

router.route('/complain').
    get(isolateOrgAndUser, getMycomplains).
    post(isolateOrgAndUser, complain).
    delete(isolateOrgAndUser, deleteComplain)

router.route('/feedback').post(isolateOrgAndUser, feedback);

router.post('/forgotPassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);



router.patch('/updaterofile', isolateOrgAndUser, allowedFileTypes('jpeg', 'jpg', 'png'), 
    fileUpload.single('photo'), updateProfile)
module.exports= router;

