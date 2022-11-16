
const {loginService, complainService, giveFeedBack, removeComplainService, getOneComplainService
,forgotPasswordService, resetPasswordService } = require('../services/employee')
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
module.exports.updateProfile = async (req, res, next)=>{
    try {
  
      if (!req.file) {
        return next(new AppError("not file uploaded, please upload file", 400));
      }
  
      const data = await updateMyPofile(req. file, req.userId)
  
      //  return the data after saving to database
      res.status(200).json({
        success: true,
        message: "profile picture has been updated/uploaded",
        data: data[0],//user
      });
    } catch (error) {
      // destroy the uploaded if it is uploaded but their is a problem while save to database
      if (data[1]) {
        await cloudinary.uploader.destroy(data[1]);
      }
      next(new AppError(error.message, 500));
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

        if(! title || !content){
           throw new AppError("please provide the proper fields", 403)
        }

        await giveFeedBack(req.userId, title, content, req.tenantId);

        res.json({
            message: "Your feedback has been taken successfuly!"
        })

    }catch(err){
        next(err)
    }
}



module.exports.forgotPassword = async (req, res, next) => {

    try {
        
            const {email, organization_name} = req.body;

            const result = await forgotPasswordService(email, organization_name)
        
            // Create reset url
            const resetUrl = `${req.protocol}://${req.get(
            'host',
            )}/api/v1/organization/resetpassword/${result}`;
        
            // const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
            return res.status(200).json({
                // message
                result
            })
                    
    } catch (error) {
        next(error);
    }

  };


  module.exports.resetPassword = async (req, res, next) => {
    
    try {
        const  {email, password, organization_name} = req.body;
        await resetPasswordService(email, req.params.resettoken, password,organization_name)

        return res.status(200).json({
            message : "password reset successfully" 
        });
        
    } catch (error) {
        next(error);
    }
  
  };
