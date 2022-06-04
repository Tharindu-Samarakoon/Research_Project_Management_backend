import express from 'express';
import { addGroup, getGroup,verifyGroupList,getGroups,acceptTopic,deniedTopic,addCoSupervisor,getGroupsCoSupervisor} from '../controllers/group.js';


const router = express.Router();

router.post('/addGroup', addGroup);
router.get('/getGroup/:id',getGroup) 
router.post('/verify', verifyGroupList);
router.get('/getGroups',getGroups);
router.post('/topicA/:id',acceptTopic);
router.post('/topicD/:id',deniedTopic );
router.get('/getCoSupervisor',getGroupsCoSupervisor);

 
export default router;