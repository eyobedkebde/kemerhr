
const {loginService, resgisterOrgService, setOrganizationCreated} = require('../services/organization')
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