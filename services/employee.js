
const employeeDAL = require('../DAL/employee');
const {createTokenEmplyee} = require('../utils/empJwt');
const cloudinary = require('../utils/cloudinary');

module.exports.loginService = async(email, password, compName)=>{
    const {user, org} = await employeeDAL.login(email, password, compName);
    const token = createTokenEmplyee(org.rows[0].name, user.rows[0].id)
    return { token, user: user.rows[0] };
}

module.exports.complainService = async(complainedon, content, complainer)=>{
    await employeeDAL.complain(complainedon, content, complainer);
}

module.exports.giveFeedBack = async(userid, title, content, tenantId)=>{
    await employeeDAL.giveFeedback(userid, title, content, tenantId);
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

module.exports.updateMyPofile = async(file, userId)=>{
    var pictureURL, picturePublic;

    await cloudinary.uploader
    .upload(file.path, { folder: "kemerhr/user" })
    .then((result) => {
      pictureURL = result.secure_url;
      picturePublic = result.public_id;
    });

    const user = await employeeDAL.updateProfilep(pictureURL,picturePublic, userId);

    return [user, picturePublic];
}
