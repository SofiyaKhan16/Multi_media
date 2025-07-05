import express from 'express';
import { getAccount, getAllAccounts, verifyGoogleToken } from '../controllers/accountController.js';

const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:id', getAccount);
router.post('/verify-google/:token', verifyGoogleToken);

export default router;
