import express from 'express'
const router = express.Router()
import {
    getPosts,
    getPostById,
    deletePost,
    createPost,
    updatePost,
    savedUpdatePost,
    createPostReview,
    getTopPosts,
} from '../controllers/postController.js'
import { protect,seller} from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getPosts)
  .post(protect, createPost)
router.route('/:id/reviews').post(protect, createPostReview)
router.get('/top', getTopPosts)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect,deletePost)
  .put(protect, updatePost)
  router
  .route('/:id/save')
  .put(protect, savedUpdatePost)

//   .delete(protect, seller, deletePost)


export default router
