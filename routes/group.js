import express from 'express';
import { addGroup, getAllStudentsOfGroup, verifyGroupList } from '../controllers/group.js';

const router = express.Router();

router.post('/addGroup', addGroup);
router.post('/verify', verifyGroupList);
router.get('/getGroupDetails/:id', getAllStudentsOfGroup);

export default router;