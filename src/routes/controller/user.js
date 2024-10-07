// user의 controller 파일

import express from 'express';
// service의 함수를 가져오기 위한 코드
import { UserService } from '../service/user';
// 라우터 설정을 위한 변수
const router = express.Router();

/*
    controller는 사용자의 요청을 받아 비즈니스 로직으로 요청에 대한 정보를 전달(혹은 정보를 요청) 후
    service로부터 데이터를 전달받아 사용자에게 데이터를 전달한다.
    View <---> Controller <---> Model (흐름)
*/
// 모든 유저를 조회
router.get('/', async (req, res) => {
    try {
        // userService를 받아옴
        const userService = new UserService();
        // userService에게 정보 전달 혹은 요청 후 데이터를 전달받음
        const data = await userService.getUser();

        // 결과 값을 사용자(프론트)에게 전달한다
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

// 특정 유저만 조회
router.get('/:id', async (req, res) => {
    try {
        const user_id = req.param.id;

        const userService = new UserService();
        const data = await userService.getOneUser(user_id);

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

// 유저 추가
router.post('/', async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.postUser(req.body);

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

// 로그인
router.post('/signin', async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.signin(req.body);

        return res.status(200).json({
            status: 4091,
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

// 회원가입
router.post('/signup', async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.signup(req.body);

        return res.status(200).json({
            status: 4091,
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

// 설정된 라우터를 내보냄
export default router;