const mongoose = require('mongoose')
const validator = require('validator')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your Name "],
    maxlength: [40, "Enter your name within 40 letters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    validate: [validator.isEmail, "Email should be in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password should be atleast 6 letters"],
  },
  cartData:{
    type:Object,
    default: {}
  }

},{minimize:false});
//  the minimize option is a schema option  which will By default, this option is true, which means Mongoose will remove empty objects from the document when it is saved to the database.

//Mongoose pre-save middleware. It runs before the save operation is executed on a document.
userModel.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
})

// the methods property allows you to add instance methods to your schema. Instance methods are methods that operate on individual documents of your model
userModel.methods.isValidatedPassword = async function(usersendPassword){
    return await bcrypt.compare(usersendPassword, this.password);
}

userModel.methods.generateJwtToken = function (){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:process.env.JWT_EXPIRY_TIME,
        });
};



module.exports = mongoose.model("User",userModel);