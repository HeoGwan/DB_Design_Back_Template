// 윈도우에선 Ctrl, 맥에선 Command를 누르시고 변수 혹은 경로를 클릭하시면 해당 파일로 이동할 수 있습니다.

// express 설정을 위한 라이브러리
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// 사용자가 설정한 라우터를 가져오기 위한 코드
// routes폴더의 index.js에서 일괄적으로 가져온다.
import { UserRouter, TestRouter } from './routes';

// express 설정을 위한 변수
const app = express();

// 에러 발생 시 보여주는 페이지를 위한 설정
// 수정하실 필요 없습니다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// express 사용을 위한 설정들
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 해당 코드를 통해 post 메소드에서 req.body를 가져올 수 있다.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// cors(Cross-Origin Resources Sharing)란?
/**
 * 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식
 * 즉, 자신이 아닌 다른 도메인(예 -> 프론트엔드의 도메인은 http://localhost:3000이고 백엔드의 도메인은 http://localhost:3333이다)에서
 * API를 요청할 때 어떤 도메인을 허용할 것인가를 설정하는 것
 * cors() -> 모든 도메인을 허용하겠다 (이는 보안적으로 위험하다. 왜냐? 이건 마치 현관문에 도어락을 달지도 않고 열쇠도 잠그지 않은 것과 같다.)
 * 특정 도메인만 허용하고 싶다면?
 * cors({
 *  origin: 'http://localhost:3000',
 * })
 * 위와 같이 한다면 http://localhost:3000을 도메인으로 가진 클라이언트의 요청만 허용한다.
 * 추가로 여러개의 도메인과 특정 메소드만 요청하도록 설정하는 방법
 * cors({
 *  origin: [
 *    'http://localhost:3000',
 *    'http://localhost:3001',
 *    'http://localhost:3002',
 *  ],
 *  method: ['GET', 'POST', 'PUT', 'DELETE'],
 *  credentials: true,
 * })
 * 위 코드는 3개의 도메인에서 GET, POST, PUT, DELETE 메소드 요청만 허용하는 방법이다.
 * credentials: true 란? 간단히 cookie 설정을 위한 설정이라고 보면 된다.
 */
app.use(cors())


// 사용자가 추가한 라우터 설정
// app.use((경로), (설정한 라우터)
// ex) 해당 코드는 http://localhost:[포트]/user 를 통해 연결된다.
app.use('/test', TestRouter);
app.use('/user', UserRouter);


// 아래 내용은 에러 설정을 위한 부분이므로 보실 필요 없습니다.
// 에러 발생 시 다음 함수로 404에 대한 메시지를 보낸다.
app.use((req, res, next) => {
  next(createError(404));
});

// 에러 처리 설정
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
