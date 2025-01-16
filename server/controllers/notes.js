const Note = require("../model/notes");
const User = require("../model/user");

exports.addNotes = async(req,res)=>{
    try {
        const userId = req.params.id
        const Tags = [...req.body.tags]
        const notes = new Note({
            ...req.body,userId:userId,tags:Tags
        })
        const noteid = notes._id
        const user = await User.findByIdAndUpdate(userId,{
            $push:{notes:noteid},
            $push:{Filters:req.body.Filters}
        })

        const notestobeaded = await notes.save()
        res.send({notestobeaded,user,msg:"note is added"})
    } catch (error) {
        console.log(error);
    }
}

exports.getNotes = async(req,res)=>{
    try {
        // console.log(req.params.id);
        const Notes = await Note.find({userId:req.params.id})
        res.send({Notes,msg:"Your Notes"})
    } catch (error) {
        console.log(error);
    }
}

exports.updateNotes = async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        const updateTime = Date.now()
        const updatednote = await Note.findByIdAndUpdate(req.params.id,{
            ...req.body,createdAt:note.createdAt,updatedAt:updateTime
        })
        res.send({updatednote,msg:"note updated"})
    } catch (error) {
        console.log(error);
    }
}

exports.deletenotes = async(req,res)=>{
    try {
        const {userId,id} = req.query
        const user =await User.findById(userId)
        // console.log(req.query.id);
        
        const deletenote =await Note.findByIdAndDelete(id)
        const updateuser = user.notes.filter((ele)=>{

            if(ele.toString() !== id){
                return ele
            }

        })

        await User.findByIdAndUpdate(userId,{
            $set:{notes:updateuser}
        })
        // res.send({user})
        res.send({updateuser,deletenote,msg:"note deleted"})
    } catch (error) {
        console.log(error);
    }
}

