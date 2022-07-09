import { getCart, insertCart, checkout } from '../controllers/cartController.js';
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.get('/carrinho', getCart);
router.post('/carrinho', insertCart);
router.post("/checkout", checkout);

export default router;
