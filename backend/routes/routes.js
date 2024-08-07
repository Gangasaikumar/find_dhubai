const express = require('express');
const Is_Authenticate =require('../middlewares/authentication').Is_Authenticate;
const allRoutes = require('../controllers/index');

const router = express.Router();

router.post("/register_user",allRoutes.auth.signUp);
router.post("/login",allRoutes.auth.login);
router.post("/makePayment", Is_Authenticate,allRoutes.payment.doPayment);

router.get("/getAllProducts", allRoutes.products.allProducts);
router.get("/getProduct",allRoutes.products.product);
router.get("/getOrders", Is_Authenticate,allRoutes.userData.getOrders); //pending
router.get("/getLocations", Is_Authenticate,allRoutes.userData.getAddresses);

module.exports = router;