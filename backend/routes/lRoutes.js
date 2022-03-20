import express from 'express'
const router = express.Router()
import {
   
    getLinkById,
} from '../controllers/linkController.js'
router
  .route('/:username/:id')
  .get(getLinkById)

  export default router
