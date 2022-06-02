import express from 'express';
import { addGroup, getGroup } from '../controllers/group.js';

const router = express.Router();

router.post('/addGroup', addGroup);
router.get('/getGroup/:id',getGroup) 
export default router;