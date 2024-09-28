// db를 사용하기 위한 mysql2 라이브러리 불러오기
const mysql = require('mysql2/promise');
/*
    가급적이면 async, await 문법을 사용하는 것을 권장한다.
    왜냐? 콜백 지옥에 빠지기 않기 위해서이다.
    
    콜백 지옥이란?
    만약 현재 예제를 async, await 문법 없이 구현한다면?

    - 현재 코드 (비동기 문법 사용)
    async (req, res) => {
        const db = await getConnection();
        const [data] = await db.query('select * from user');
        return res.status(200).json({
            status: 200,
            message: 'success',
            data,
        });
    }

    - 비동기 문법 사용 X
    (req, res) => {
        getConnection()
            .then((db) => {
                    db.query('select * from user')
                    .then((data) => {
                            return res.status(200).json({
                                status: 200,
                                message: 'success',
                                data: data[0],
                            });
                        })
                })
    }

    조금 표현을 거칠게 하자면 딱 봐도 코드가 역겹다!
    콜백 지옥은 이와 같이 계속해서 콜백을 사용해 마치 코드가 화살촉 모양처럼 되는 것을 말한다.(우스갯소리로 이 화살촉에 찔려죽은 개발자가 있다는 소문이..)
    이는 코드를 작성한 본인도 몇일 후 코드를 본다면 화가 날텐데 다른 팀원들은 얼마나 더 화가날까?
    그렇기 때문에 이를 피하기 위한 문법이 async, await 문법이고 왠만하면 비동기 문법을 사용하는 것이 좋다.
*/

// db 커넥션 풀 설정
/*
    커넥션 풀(connection pool)이란?
    커넥션(connection)이란 connection을 만들고 연결하고 쿼리를 실행하고 접속을 종료하는 일련의 과정이다.
    createConnection() -> connect() -> query() -> end()
    하지만 사용자의 요청에 따라 커넥션을 계속해서 만들면 사용자의 요청이 많아졌을 때 서버에 과부하가 걸린다.
    그렇기 때문에 일정 커넥션을 미리 만들어놔 사용자의 요청이 발생하면 연결해주고 연결 종료 시 pool에 다시 보관하는 형태로 동작한다.
    이렇게 pool에 일정 커넥션을 보관하면 사용자의 요청이 많아져도 일정 커넥션만 연결되기 때문에 과부화를 에방할 수 있다.
*/
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',           // 자신의 mysql 아이디를 입력한다.
    password: '1234',       // 자신의 mysql 비밀번호를 입력한다.
    database: 'db_design',  // 자신이 생성한 데이터베이스(스키마) 이름을 입력한다(create database로 만든 이름이다).
    connectionLimit: 10,    // 최대 커넥션 개수를 설정한다.
});

export default db;