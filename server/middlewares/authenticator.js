const jwt = require("jsonwebtoken")
const User = require("../model/user")

exports.authenticator=async(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,process.env.SECRET)
        const user = await User.findOne({email:verify.email})
        res.userId=user._id;
        
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token")
    }
}


