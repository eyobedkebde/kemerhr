
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
