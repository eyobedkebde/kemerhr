const c= require('../DAL/createTables')

module.exports.createOrg = async(req, res, next)=>{
    try{
        
        res.json({
            message:"new Organization Created successfully!",
        });
        
    }catch(err){
        next(err)
    }
}