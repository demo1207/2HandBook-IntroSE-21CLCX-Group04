const express = require('express');
const accountController = require('../controllers/account.controller');
const { body, getErrorMessage } = require('../middleware/validation');

const router = express.Router();

router.get('/sign-up', accountController.showSignUp);
router.post('/sign-up', accountController.signUp);
router.get('/sign-in', accountController.showSignIn);
router.post(
  '/sign-in',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Invalid email address!'),
  body('password').trim().notEmpty().withMessage('Password is required!'),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render('sign-in', { loginMessage: message });
    }
    next();
  },
  accountController.signIn
);
router.get('/forgot', accountController.showForgotPassword);
router.post('/forgot', accountController.forgotPassword);
router.get('/reset', accountController.showResetPassword);
router.post('/reset', accountController.resetPassword);
router.use(accountController.isLoggedIn);
router.get('/profile', accountController.showProfile);
router.get('/sign-out', accountController.signOut);
router.get('/my-profile', accountController.getMyProfile);
router.get('/my-order-pending', accountController.getMyOrderPending);
router.get('/my-order-cancelled', accountController.getMyOrderCancelled);
router.get('/my-order', accountController.getMyOrder);
router.get('/become-seller', accountController.getBecomeSeller);

module.exports = router;
