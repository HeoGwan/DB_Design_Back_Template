// user의 service 파일

// db와 연결된 변수 가져오기
import db from '../../db';

// db와 소통하는 함수 목록
// user를 가져오기 위한 함수
export const getUser = async (req, res) => {
    // user를 가져오기 위한 쿼리 작성 및 실행
    // 변수의 이름을 [data]처럼 감싼 이유는?
    /*
    db.query의 결과는 아래와 같이 배열이 반환된다
    [
        [db에서 가져온 데이터],
        [db설정에 관련된 데이터]
        ]
        이 중 db설정에 관련된 데이터는 우리에게 필요없는 것이기 때문에 [data]를 이용해서 0번째 인덱스만 받아온다.
        
        const result = await db.query('select * from user');    
        const data = result[0];
        위 코드와 아래 코드의 결과값은 동일하다.
        */
    const [data] = await db.query('select * from user');

    // 결과 반환
    return res.status(200).json({
        status: 200,
        message: 'success',
        data,
    });
}

export const getOneUser = async (req, res) => {
    const user_id = req.params.id;

    // 쿼리의 길이가 길다면 따로 변수를 만들어서 사용하면 편하다
    const getOneQuery = 'select * from user where user_id = ?';

    // 변수 이름을 [[data]]처럼 괄호를 두 번 감싼 이유는?
    /*
        위 설명에서 db.query의 결과 값은 배열임을 알 수 있다.
        그런데 만약 데이터를 하나만 조회하고 싶다면?(ex) 마이페이지에 데이터를 띄울 경우 한 명의 유저 데이터만 조회하면 됨)
        우리는 데이터를 하나만 조회한다고 생각하지만 실제 결과는 getUser와 똑같다.
        즉, [data]로 아래 코드를 실행한다면 data의 값은 원소가 1개인 배열이 되는 것이다.
        우리는 어차피 하나의 데이터만 불러올 것이므로 애초에 변수 선언 시 괄호를 두개 감싸 데이터를 하나만 불러오는 것이다.
        
        1.
        const [result] = await db.query(getOneQuery, user_id);
        const data = result[0];
        
        2.
        const result = await db.query(getOneQuery, user_id);
        const data = result[0][0];

        위 두 가지 경우와 아래 코드의 결과값은 동일하다.
    */
    const [[data]] = await db.query(getOneQuery, user_id);

    return res.status(200).json({
        status: 200,
        message: 'success',
        data: data,
    });
}

export const postUser = async (req, res) => {
    const { id, pw, name, phone } = req.body;

    const postQuery = 'insert into user(id, pw, name, phone) values(?, ?, ?, ?)';
    const [data] = await db.query(postQuery, [id, pw, name, phone]);

    return res.status(200).json({
        status: 200,
        message: 'success',
        data
    });
}

export const signin = async (req, res) => {
    try {
        const { id, pw } = req.body;

        const getUserQuery = 'select * from user where id = ?';
        const [[user]] = await db.query(getUserQuery, [id]);

        if (!user) {
            throw new Error(`invalid id`);
        }

        if (user.pw != pw) {
            throw new Error(`wrong password`);
        }

        const data = {
            id: user.id,
            name: user.name,
            phone: user.phone,
        };

        return res.status(200).json({
            status: 4091,
            message: 'success',
            data,
        });
    } catch (e) {
        return res.status(200).json({
            status: 500,
            message: 'signin error',
            data: e,
        });
    }
}

export const signup = async (req, res) => {
    try {
        const { id, pw, name, phone } = req.body;

        const getUserQuery = 'select * from user where id = ?';
        const [[user]] = await db.query(getUserQuery, [id]);

        if (user) {
            throw new Error(`already has user`);
        }

        const postUserQuery = 'insert into user(id, pw, name, phone) values(?, ?, ?, ?)';
        const [data] = await db.query(postUserQuery, [id, pw, name, phone]);

        return res.status(200).json({
            status: 4091,
            message: 'success',
            data,
        });
    } catch (e) {
        return res.status(200).json({
            status: 500,
            message: e.message,
            data: e,
        });
    }
}