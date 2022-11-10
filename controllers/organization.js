
const {loginService} = require('../services/organization')


module.exports.login = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        if(! email || !password){
            console.log("please provide email")
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


// register
module.exports.createOrganization = async(req, res, next) =>{
    try {
        const {name, email,password, phoneNumber} = req.body;
        if (!name || ! email || !password || !phoneNumber){
            console.log("Field can't be empty!")
        }
        
        const {user} = await resgisterOrgService(name, email,password, phoneNumber);
        res.json({
            message:"Registed successfully!",
            user: user

        })
    } catch (error) {
        next(error)
    }
}