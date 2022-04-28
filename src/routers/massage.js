import { Router } from "express";
import controller  from '../controllers/massage.js'
import validation from "../middleware/validation.js";
const router = Router()

router.post('/massage',validation,controller.POST)
router.get('/massage',controller.GET)
router.get('/download/:fileName',controller.DOWNLOAD)

export default router