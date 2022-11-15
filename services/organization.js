
const organizationDAL = require('../DAL/organization');
const {createToken} = require('../utils/createJwt');
const {AppError} = require('../utils/ErrorHandler')

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


module.exports.addEmployeeDataService = async (firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password)=>{
    
    return await organizationDAL.addEmployeeData(firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password);
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


module.exports.updateEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}


module.exports.getOneEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}



module.exports.getEmployees = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}


module.exports.deleteEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}



module.exports.createTeam = async(req, res, next)=>{
    try{
        
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        

    }catch(err){
        next(err)
    }
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
