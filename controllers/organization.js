
const {loginService, resgisterOrgService, 
    setOrganizationCreated, createInternalNoticeService,getAllNoties,
    removeNoticeService,getAllFeedbacks, removeFeedbacksService} = require('../services/organization')
const {AppError} = require('../utils/ErrorHandler')

module.exports.login = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        if(! email || !password){
           throw new AppError("please provide email", 403)
        }

        const {token, user} = await loginService(email, password);

        res.json({
            message: "successfuly logged in",
            user,
            token,
        })

    }catch(err){
        next(err)
    }
}


// register
module.exports.registerOrganization = async(req, res, next) =>{
    try {
        const {name, email,password, phoneNumber} = req.body;
        if (!name || ! email || !password || !phoneNumber){
            throw new AppError("Field can't be empty", 403);
        }
        
        const user = await resgisterOrgService(name, email,password, phoneNumber);
        
        res.json({
            message:"Registed successfully!",
            user: user

        })
    } catch (error) {
        next(error)
    }
}


module.exports.createOrg = async(req, res, next)=>{
    try{
        await setOrganizationCreated(req.tenantId);
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}

module.exports.createInternalNotice = async (req, res, next) => {
    try {
        const { content, title, postby } = req.body;

        if( !content || !title || !postby){
            throw new AppError("Field can't be empty", 403);
        }

        await createInternalNoticeService(req.body);

    } catch (err) {
        next(err)
    }
}

module.exports.getallNotices = async (req, res, next) => {
    try {
        const allNotice = await getAllNoties();

        res.json({
            message:"All noticess on the platform",
            user: allNotice.rows

        })
    } catch (err) {
        next(err)
    }
}

module.exports.removeNotice = async (req, res, next) => {
    try {
        const { noticeId } = req.body;
        await removeNoticeService(noticeId);

        res.json({
            message:"Selected notice deleted successfuly!",
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getFeedbacks = async (req, res, next) => {
    try {
        const allFeedbacks = await getAllFeedbacks();

        res.json({
            message:"Selected notice deleted successfuly!",
            data: allFeedbacks
        })
    } catch (err) {
        next(err)
    }
}

module.exports.removeFeedbacks = async (req, res, next) => {
    try {
        await removeFeedbacksService(req.body.feedbackId);

        res.json({
            message:"Selected feedback deleted successfuly!",
        })
    } catch (err) {
        next(err)
    }
}