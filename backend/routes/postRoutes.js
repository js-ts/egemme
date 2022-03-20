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
    likePost,
    unlikePost,
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getPosts)
  .post(protect, admin,createPost)
router.route('/:id/reviews').post(protect, createPostReview)
router.get('/top', getTopPosts)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect, admin,deletePost)
  .put(protect, admin,updatePost)
  router
  .route('/:id/save')
  .put(protect, admin,savedUpdatePost)
  router
  .route('/like/:id')
  // @route    PUT api/posts/like/:id
  // @desc     Like a post
  // @access   Private
  .put(protect, likePost);

router
  .route('/unlike/:id')
  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  .put(protect, unlikePost);
// router
//   .route('/:id')
//   .get(getPostById)
//   .post(protect, seller, createPost)
//   .delete(protect, seller, deletePost)


export default router
