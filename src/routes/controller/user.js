import express from 'express';
import { getOneUser, getUser, postUser } from '../service/user';
const router = express.Router();

router.get('/', getUser);
router.get('/:id', getOneUser);
router.post('/', postUser);

export default router;