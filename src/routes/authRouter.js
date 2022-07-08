import { loginUser, createUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/login', loginUser);
router.post('/cadastrar', createUser);
router.get('/carrinho');

export default router;
