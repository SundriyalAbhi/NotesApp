const User = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.SignUp = async(req,res)=>{
    try {
        const checkUser =await User.findOne({email:req.body.email})
        if(checkUser){
            res.status(409).send("User already exists")
        }

        const {password} = req.body
        const Salt =await bcrypt.genSalt(10)
        const hashpassword =await bcrypt.hash(password,Salt)
        const NewUser = new User({
            ...req.body,password:hashpassword
        })
        const user = await NewUser.save()
        res.send({user,msg:"Your Account is Created"})
    } catch (error) {
        console.log(error);
    }

}

exports.SignIn = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(user){
            const userId = user._id
            const verify = await bcrypt.compare(password,user.password)

            if(verify){
                const token = jwt.sign({email,password},process.env.SECRET,{expiresIn:"1hr"})
                res.send({token,userId,profilepic:user.ProfilePicture,msg:"Welcome"})
            }else{
                res.status(401).send("Wrong Password")
            }
        }else{
            res.status(404).send("user does not Exists")
        }
    } catch (error) {
        console.log(error);
    }
}