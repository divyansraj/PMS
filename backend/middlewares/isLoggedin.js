const jwt = require('jsonwebtoken');
const isLoggedin = async (req, res, next) =>{
    try{
    const token = req.headers.token;
    if(!token){
        res.send("Login in first to access cart")
    }

    const decoded_user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userid = decoded_user.id
    console.log(decoded_user.id);
    next();
}
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

module.exports = isLoggedin;