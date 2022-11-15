
const employeeDAL = require('../DAL/employee');
const {createTokenEmplyee} = require('../utils/empJwt');

module.exports.loginService = async(email, password, compName)=>{
    const {user, org} = await employeeDAL.login(email, password, compName);
    const token = createTokenEmplyee(org.rows[0].name, user.rows[0].id)
    return { token, user: user.rows[0] };
}

module.exports.complainService = async(complainedon, content, complainer)=>{
    await employeeDAL.complain(complainedon, content, complainer);
}

module.exports.giveFeedBack = async(userid, title, content)=>{
    await employeeDAL.giveFeedback(userid, title, content);
}

module.exports.removeComplainService = async(complainId)=>{
    await employeeDAL.removeComplain(complainId);
}

module.exports.getOneComplainService = async(complainId)=>{
    const complains = await employeeDAL.getOneComplain(complainId);
    return complains;
}


module.exports.forgotPasswordService = async(email,organization_name)=>{   
    return await employeeDAL.forgotPassword(email, organization_name);
}


module.exports.resetPasswordService = async(email, resettoken, password,  organization_name )=>{   
    return await employeeDAL.resetPassword(email, resettoken, password,organization_name );
}
