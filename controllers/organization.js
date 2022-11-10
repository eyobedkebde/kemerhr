
const {loginService} = require('../services/organization')
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
            token,
            user
        })

    }catch(err){
        next(err)
    }
}