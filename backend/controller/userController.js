const User = require('../models/UserModel')
const validator = require('validator')

exports.login = async(req,res,next)=> {
    try{
        const {email,password} =req.body;
        if(!email || !password){
          res.json({
            message: "Email and password must be provided",
          });
            return next(Error("Email and Password is required."));
        }

        const user = await User.findOne({email:email});

        if(!user){
            res.json({
              message: "User does not exist"
            });
            return next(Error("User does not exist."));
        }

        const validateUser = await user.isValidatedPassword(password);

        if(!validateUser){
          res.json({
            message: "Password is incorrect",
          });
            return next(Error("Password is incorrect."));
        }

        const generateJwtToken = user.generateJwtToken();
        user.password =undefined;
        res.json({
            success:true,
            token:generateJwtToken,
            user,
            message:"Login Successful"
        })

        console.log(user)

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Please enter correct details"
        })
    }

}

exports.register=async(req,res,next)=> {
    try{
        const {name,email,password} =req.body;
        if(!name || !email || !password){
            return next(Error("Name, Email and Password is required."));
        }
        const user = await User.findOne({email:email})

        if(user){
            return res.json({
              success: false,
              message: "User Already Exists",
            });
        }
        if(password.length<6){
            res.send("Password must be at least 6 characters")
        }
        if(!validator.isEmail(email)){
            res.send("Please enter a valid email");
        }
        

        const newUser =await User.create({
            name:name,
            email:email,
            password:password,
        })
        const token = newUser.generateJwtToken();
        res.json({
            success:true,
            message:"Registration Successful",
            newUser,
            token,   
        })
        console.log(newUser)
    }
    catch(error){
        console.log(error);
         res.json({
           success: false,
           message: "Please enter correct details",
         });
    }
}

exports.getUserDetails =async(req,res,next) => {
    try{
        const user = await User.findById(req.body.userid);
        user.password = undefined;
        res.json({
        success:true,
        user
    })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
    
}
exports.allUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    user.password = undefined;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.addProject = async (req, res, next) => {
  try {
    const {userid} =req.body;
    const user = await User.findById(userid);
    user.password = undefined;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.oneUser = async (req, res, next) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId);
    user.password = undefined;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};