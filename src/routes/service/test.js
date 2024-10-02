import db from '../../db';

export const getTest = async (req, res) => {
    return res.status(200).json({
        status: 200,
        message: 'success',
        data: '백 연결 테스트 API입니다.',
    });
}