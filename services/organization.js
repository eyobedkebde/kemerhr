
const organizationDAL = require('../DAL/organization');
const {createToken} = require('../utils/createJwt');
const {AppError} = require('../utils/ErrorHandler')

module.exports.loginService = async(email, password)=>{
    try{
        const result = await organizationDAL.login(email, password)
        const token = createToken(result.rows[0].id)
        return token;
    }
    catch(err){
        throw new AppError("Internal error", 403)
    }

}