
import express from 'express'
const router = express.Router()
import metadata from '../controllers/metadataController.js'
router
  .route('/')
  .get(metadata)

  export default router
