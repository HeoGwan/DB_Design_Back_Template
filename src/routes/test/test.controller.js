import express from 'express';
import { TestService } from './test.service';
// 라우터 설정을 위한 변수
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const testService = new TestService();
        const data = await testService.test();

        return res.status(200).json({
            status: 200,
            message: 'success',
            data,
        });
    } catch (e) {
        return res.status(200).json({
            status: 500,
            message: 'server error',
            data: e.message,
        });
    }
});

// 설정된 라우터를 내보갬
export default router;