
const organizationDAL = require('../DAL/organization');
const {createToken} = require('../utils/createJwt');


module.exports.loginService = async(email, password)=>{
    try{
        const result = await organizationDAL.login(email, password)
        const token = createToken(result.rows[0].id)
        return token;
    }
    catch(err){
        console.log(err);
    }

}