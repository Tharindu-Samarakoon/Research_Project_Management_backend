import express from 'express';
import { addGroup, getAllStudentsOfGroup, getGroupDetails, requestSupervisor, submitTopic, verifyGroupList } from '../controllers/group.js';
import { getStudentToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/addGroup', addGroup);
router.post('/verify', verifyGroupList);
router.post('/addTopic/:id', submitTopic);
router.post('/requestSupervisor/:id', getStudentToken, requestSupervisor);
router.get('/group/:id', getStudentToken, getGroupDetails);
router.get('/getGroupDetails/:id', getAllStudentsOfGroup);


export default router;