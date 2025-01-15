const folder = require("../model/folder");
const Note = require("../model/notes");
const User = require("../model/user");


exports.getprofile = async (req,res)=>{
   try {
    let myprofile = await User.findOne({_id:req.params.id})
    myprofile = myprofile.toObject();
   delete myprofile.password
   res.send({myprofile,msg:"profile get"})
   } catch (error) {
    console.log(error);
   }
}

exports.deleteaccount = async (req,res)=>{
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    const deleteNotes = await Note.findByIdAndDelete({
      userId:req.params.id})
    const deleteFolder = await folder.findByIdAndDelete({
      folderCreator:req.params.id})
    res.send({user,deleteFolder,deleteNotes,msg:"User"})
  } catch (error) {
    console.log(error);
  }
}

exports.updateprofile= async (req,res)=>{
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{username:req.body.username,email:req.body.email,
    ProfilePicture:req.body.ProfilePicture})
    console.log(user);
    
    res.send(user)
  } catch (error) {
    console.log(error);
  
  }
}

