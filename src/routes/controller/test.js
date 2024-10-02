// user의 controller 파일

import express from 'express';
import { getTest } from '../service/test';
// service의 함수를 가져오기 위한 코드
// 라우터 설정을 위한 변수
const router = express.Router();

// 각 메소드에 맞는 함수를 연결시킴
router.get('/', getTest);

// 설정된 라우터를 내보갬
export default router;