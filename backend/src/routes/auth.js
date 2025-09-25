import express from 'express';
import { register, login, sendRegisterCode } from '../controllers/authController.js';
import { validateLogin, validateRegister, validateSendRegisterCode } from '../middleware/validate.js';
import { requestChangeEmail, verifyChangeEmail } from '../controllers/changeEmailController.js';
import { changePassword } from '../controllers/changePasswordController.js';
import { auth } from '../middleware/auth.js';
import { requestResetPasswordCode, resetPassword } from '../controllers/resetPasswordController.js';
const router = express.Router();


router.route('/login')
  .post(validateLogin, login);
  

router.post('/register/send-code', validateSendRegisterCode, sendRegisterCode);
router.route('/register')
  .post(validateRegister, register);

// Change email flow
router.post('/change-email/request', requestChangeEmail);
router.post('/change-email/verify', verifyChangeEmail);

// Change password flow
router.post('/change-password', auth, changePassword);

// Password reset (public because user may be logged out)
router.post('/reset-password/request', requestResetPasswordCode);
router.post('/reset-password', resetPassword);

export default router;