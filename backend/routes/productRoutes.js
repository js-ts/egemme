import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin,seller } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin,createProduct).post(protect,seller, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .delete(protect,seller, deleteProduct)
  .put(protect, admin,updateProduct)
  .put(protect, seller, updateProduct)
router.route('/:id/updatestock').put(protect, updateProductStock)
router.route('/:id/stock').put(protect, updateProductStock)
export default router
