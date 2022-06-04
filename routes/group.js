import express from 'express';
import { addCoSupervisor, addGroup, getAllStudentsOfGroup, getGroupDetails, requestSupervisor, submitTopic, testSample, verifyGroupList } from '../controllers/group.js';
import { getStudentToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/addGroup', addGroup);
router.post('/verify', verifyGroupList);
router.post('/addTopic/:id', submitTopic);
router.post('/requestSupervisor/:id', getStudentToken, requestSupervisor);
router.post('/requestCoSupervisor/:id', getStudentToken, addCoSupervisor);
router.get('/group/:id', getStudentToken, getGroupDetails);
router.get('/getGroupDetails/:id', getAllStudentsOfGroup);
router.post('/sampletesting/test1', testSample)


export default router;