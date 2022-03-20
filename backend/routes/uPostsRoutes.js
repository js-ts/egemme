import express from 'express'
const router = express.Router()
import {getPostByUser,getAllPostByUser} from '../controllers/blogcontroller.js'
import { protect, admin ,seller} from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getPostByUser)
router
  .route('/all/')
  .get(getAllPostByUser)



export default router
