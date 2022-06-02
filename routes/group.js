import express from 'express';
import { addGroup, verifyGroupList } from '../controllers/group.js';

const router = express.Router();

router.post('/addGroup', addGroup);
router.post('/verify', verifyGroupList);

export default router;