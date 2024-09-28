// 윈도우에선 Ctrl, 맥에선 Command를 누르시고 변수 혹은 경로를 클릭하시면 해당 파일로 이동할 수 있습니다.

// express 설정을 위한 라이브러리
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// 사용자가 설정한 라우터를 가져오기 위한 코드
// routes폴더의 index.js에서 일괄적으로 가져온다.
import { UserRouter } from './routes';

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


// 사용자가 추가한 라우터 설정
// app.use((경로), (설정한 라우터)
// ex) 해당 코드는 http://localhost:[포트]/user 를 통해 연결된다.
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
