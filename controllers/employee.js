
const {loginService, complainService, giveFeedBack, removeComplainService, getOneComplainService
} = require('../services/employee')
const {AppError} = require('../utils/ErrorHandler')

module.exports.login = async (req, res, next)=>{
    try{
        const {email, password, compName} = req.body;
        if(! email || !password || !compName){
           throw new AppError("please provide email", 403)
        }

        const {token, user} = await loginService(email, password, compName);

        res.json({
            message: "successfuly logged in",
            user,
            token,
        })

    }catch(err){
        next(err)
    }
}

module.exports.complain = async (req, res, next)=>{
    try{
        const {complainedon, content} = req.body;

        if(! complainedon || !content){
           throw new AppError("please provide the proper fields", 403)
        }

        await complainService(complainedon, content, req.userId);

        res.json({
            message: "Your complaint has been reported successfuly!"
        })

    }catch(err){
        next(err)
    }
}

module.exports.getMycomplains = async (req, res, next)=>{
    try{

        const complains = await getOneComplainService(req.userId);

        res.json({
            message: "Your complaint has been reported successfuly!",
            data:complains
        })

    }catch(err){
        next(err)
    }
}

module.exports.deleteComplain = async (req, res, next)=>{
    try{
        const {complainId} = req.body;

        if(! complainId){
           throw new AppError("please provide the proper fields", 403)
        }

        await removeComplainService(complainId);

        res.json({
            message: "Your complaint has been deleted successfuly!"
        })

    }catch(err){
        next(err)
    }
}

module.exports.feedback = async (req, res, next)=>{
    try{
        const {title, content} = req.body;

        if(! complainedon || !content){
           throw new AppError("please provide the proper fields", 403)
        }

        await giveFeedBack(req.userId, title, content);

        res.json({
            message: "Your feedback has been taken successfuly!"
        })

    }catch(err){
        next(err)
    }
}
