const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const { connectdb } = require("./Config/db")
const AuthRouter = require("./routes/auth")
const morgan = require("morgan")
const NotesRouter = require("./routes/notes")
const folderRouter = require("./routes/folder")
const profileRouter = require("./routes/profile")

const app = express()
app.use(cors())
app.use(bodyParser.json({
    limit:"30mb"
}))
dotenv.config({path:"./Config/config.env"})
connectdb()
app.get("/",(req,res)=>{
    try {
        res.send("Hello")
    } catch (error) {
        console.log(error);
    }
})
app.use(morgan("dev"))
app.use("/auth",AuthRouter)
app.use("/notes",NotesRouter)
app.use("/folder",folderRouter)
app.use("/profile",profileRouter)
app.listen(process.env.PORT,()=>{
    console.log("server is runing");
})