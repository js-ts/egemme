import express from 'express';
import {
  sendForgotPasswordEmail,
  resetPassword,
} from '../controllers/ResetPasswordController.js';

const router = express.Router()
router.post('/forgot-password', sendForgotPasswordEmail);
router.post('/reset', resetPassword);

export default router;
