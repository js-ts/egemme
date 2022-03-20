import express from 'express'
const router = express.Router()
import {
    getLinks,
    getLinkById,
    deleteLink,
    createLink,
    updateLink,
    savedUpdateLink,
    getTopLinks,
    likeLink,
    unlikeLink,
} from '../controllers/linkController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getLinks)
  .post(protect, createLink)
router.get('/top', getTopLinks)
router
  .route('/:username/:id')
  .get(getLinkById)
  .delete(protect, deleteLink)
  .put(protect, updateLink)
router
  .route('l/:username/:id')
  .get(getLinkById)
  .delete(protect, deleteLink)
  .put(protect, updateLink)
  router
  .route('/:id/save')
  .put(protect, savedUpdateLink)
  router
  .route('/like/:id')
  // @route    PUT api/links/like/:id
  // @desc     Like a post
  // @access   Private
  .put(protect, likeLink);

router
  .route('/unlike/:id')
  // @route    PUT api/links/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  .put(protect, unlikeLink);
// router
//   .route('/:id')
//   .get(getLinkById)
//   .post(protect, seller, createLink)
//   .delete(protect, seller, deleteLink)


export default router
