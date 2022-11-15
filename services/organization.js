
const organizationDAL = require('../DAL/organization');
const {createToken} = require('../utils/createJwt');
const {AppError} = require('../utils/ErrorHandler')
const cloudinary = require('../utils/cloudinary');

module.exports.loginService = async(email, password)=>{
    const result = await organizationDAL.login(email, password);
    const token = createToken(result.rows[0].name)
    return { token, user: result.rows[0] };
}

module.exports.resgisterOrgService = async(name, email,password, phoneNumber)=>{
    const result = await organizationDAL.register(name, email,password, phoneNumber)
    return result;
}

module.exports.setOrganizationCreated = async(tenantId)=>{
    await organizationDAL.actvateOrg(tenantId)
}

module.exports.createTeamService = async (team_name,status)=>{
    return await organizationDAL.createTeam(team_name,status);
}


module.exports.addEmployeeDataService = async (firstname,lastname,email,phone_number,gender,birthdate, role, teamid, password)=>{//file, 
    // var pictureURL, picturePublic;

    // await cloudinary.uploader
    // .upload(file.path, { folder: "kemerhr/user" })
    // .then((result) => {
    //     console.log(result)
    //   pictureURL = result.secure_url;
    //   picturePublic = result.public_id;
    // }).finally((result)=>console.log(result));
    return await organizationDAL.addEmployeeData( "pictureURL", "picturePublic",
    firstname,lastname,email,phone_number,gender,birthdate, role, teamid, password);
}


module.exports.addEmployeeAddressService = async (empid, country, city, subcity, wereda, housenumber)=>{
    return await organizationDAL.addEmployeeAddress(empid, country, city, subcity, wereda, housenumber)
}


module.exports.addEmployeeMaritalStatusService = async (status, userid, numberofchildren)=>{
    return await organizationDAL.addEmployeeMaritalStatus(status, userid, numberofchildren)
}



module.exports.addEmployeeStatusService = async(userid,yearlyrest,probation,numberofprobation,status)=>{
    return await organizationDAL.addEmployeeStatus(userid,yearlyrest,probation,numberofprobation,status);
}


module.exports.updateEmployeeService = async(id, firstname,lastname,email,phone_number)=>{
    return await organizationDAL.updateEmployee(id, firstname,lastname,email,phone_number)
}


module.exports.getOneEmployeeService = async(email)=>{
    return await organizationDAL.getOneEmployee(email)
}


/**
 * get all employees
 * @returns Promise
 */
module.exports.getEmployeesService = async()=>{
    return await organizationDAL.getAllEmployee();
}

/**
 * deletes the user from database
 * @param {string} id -user id
 * @returns 
 */
module.exports.deleteEmployeeService = async(id)=>{
    return await organizationDAL.deleteEmployee(id)
}


module.exports.createInternalNoticeService = async({ content, title, postby })=>{
    await organizationDAL.createaNotice( content, title, postby)
}

module.exports.getAllNoties = async()=>{
    const allNotice = await organizationDAL.getcreatedNoices();
    return allNotice;
}

module.exports.removeNoticeService = async(noticeId)=>{
    await organizationDAL.removeExistingNotice(noticeId);
}

module.exports.getAllFeedbacks = async()=>{
   const allFeedbacks= await organizationDAL.getFeedbacks();
   return allFeedbacks;
}

module.exports.removeFeedbacksService = async(feedbackId)=>{
   await organizationDAL.removeFeedback(feedbackId);
}
