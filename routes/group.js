import express from 'express';
import { addGroup, getGroup,verifyGroupList } from '../controllers/group.js';


const router = express.Router();

router.post('/addGroup', addGroup);
router.get('/getGroup/:id',getGroup) 
router.post('/verify', verifyGroupList);

export default router;