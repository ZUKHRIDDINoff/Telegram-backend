import {InternalServerError } from '../utils/errors.js'
import path from 'path'
const POST = (req,res,next)=>{
    try {
        let massages = req.readFile('massages')
        const {massageText,userId,time} = req.body
        if(massageText){
            const newFile = {
                massageId: massages.length ? massages.at(-1).massageId + 1 : 1,
                massageText,userId,
                massageDate: time
            }
            massages.push(newFile)
            req.writeFile('massages',massages)
            return res.status(200).json({
                status: 201,
                massage: "The massage added!",
                data: newFile
            }) 
        }
        const {file} = req.files
        let massageFileLink = Date.now() + file.name.replace(/\s/g,'')
        if(file){
            const newFile = {
                massageId: massages.length ? massages.at(-1).massageId + 1 : 1,
                userId,
                massageDate: time,
                massageFileLink:`http://192.168.2.207:4004/${massageFileLink}`,
                downloadLinkFile:massageFileLink
            }
            massages.push(newFile)
            req.writeFile('massages',massages)
            file.mv(path.join(process.cwd(),'src','uploads',massageFileLink))

            return res.status(200).json({
                status: 201,
                massage: "The massage added!",
                data: newFile
            })
        }
        
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}

const GET = (req,res,next) =>{
    try {
        let massages = req.readFile('massages')
        let users = req.readFile('users')
        let massage = massages.map(massag => {
            massag.user = users.find(user => user.userId == +massag.userId)
            massag.viewLinkFile = `http://192.168.2.207:4004/` + massag.massageFileLink
            massag.downloadLinkFile = `http://192.168.2.207:4004/` + 'download/' + massag.downloadLinkFile
            // delete massag.userId
            // delete massag.user.password
            return massag
        })
        return res.status(200).json(massage)
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const DOWNLOAD = (req,res,next) => {
    try {
        res.download(path.join(process.cwd(),'src','uploads',req.params.fileName))
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}

export default {
    POST,
    GET,
    DOWNLOAD
}