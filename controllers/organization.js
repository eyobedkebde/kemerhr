
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
        })

    }catch(err){
        next(err)
    }
}