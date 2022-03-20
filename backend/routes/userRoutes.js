import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  getUserByUserName,
  updateUser,
  addtoCart,
  addtoWishlist,
  follow,
  unfollow
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  router
  .route('/cart/:id')
  .put(protect, addtoCart)
  router
  .route('/wishlist/:id')
  .put(protect, addtoWishlist)
  
  router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser)
  router
  .route('/u/:username')
  .get(protect, getUserByUserName)
  router.put("/follow/:id",protect,follow )
  router.put("/unfollow/:id", protect,unfollow)
export default router
