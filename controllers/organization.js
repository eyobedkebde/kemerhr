
const {loginService, resgisterOrgService,createTeamService,addEmployeeStatusService, addEmployeeAddressService, setOrganizationCreated, addEmployeeDataService, addEmployeeMaritalStatusService} = require('../services/organization')
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

module.exports.createTeam = async(req, res, next)=>{
    
    try{
        const {team_name,status } = req.body;
        const result  = await createTeamService(team_name,status)

        res.json({
            data: result.rows,
            
        });
        
    }catch(err){
        next(err)
    }
}


module.exports.addEmployeeData = async(req, res, next)=>{
    try{
        const {firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password} = req.body;
        
        await addEmployeeDataService(firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password)
        
        res.json({
            message:`new employee Created successfully`,
        });
        
    }catch(err){
        next(err)
    }
}

module.exports.addEmployeeAddress = async(req, res, next)=>{
    
    try{
        const {empid, country, city, subcity,wereda ,housenumber } = req.body;
        console.log(empid, country, city, subcity,wereda ,housenumber )
        await addEmployeeAddressService(empid, country, city, subcity, wereda, housenumber)

        res.json({
            message:`new employee address Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}

module.exports.addEmployeeMaritalStatus = async(req, res, next)=>{
    try{

        const {status, userid, numberofchildren } = req.body;
        await addEmployeeMaritalStatusService(status, userid, numberofchildren)
        
        res.json({
            message:`new employee marital status Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}

module.exports.addEmployeeStatus = async(req, res, next)=>{
    try{

        const {userid,yearlyrest,probation,numberofprobation,status} = req.body;
        await addEmployeeStatusService(userid,yearlyrest,probation,numberofprobation,status);

        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}

module.exports.updateEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}


module.exports.getOneEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}



module.exports.getEmployees = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}


module.exports.deleteEmployee = async(req, res, next)=>{
    try{
        
        res.json({
            message:`new Organization Created successfully with the name of ${req.tenantId}!`,
        });
        
    }catch(err){
        next(err)
    }
}


