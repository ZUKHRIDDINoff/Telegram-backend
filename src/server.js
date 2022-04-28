import express from "express"
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import userRouter from './routers/user.js'
import massageRouter from './routers/massage.js'
import modelMiddleware from './middleware/module.js'
const PORT = process.env.PORT || 4004

const app = express()
app.use(cors())
app.use(modelMiddleware({databasePath: path.join(process.cwd(),'src','database')}))
app.use(express.static(path.join(process.cwd(),'src','uploads')))
app.use(express.json())
app.use(fileUpload())
app.use(userRouter)
app.use(massageRouter)

app.use((error,req,res,next)=> {
    if(error.status != 500){
        return res.status(error.status).json({
            status:error.status,
            massage:error.massage,
            data: null,
            token: null
        })
    } 
})  

app.listen(PORT,()=>{console.log(`server is run http://192.168.2.207:${PORT}`)})