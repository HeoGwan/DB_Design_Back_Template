// 사용자가 만든 컨트롤러 파일을 일괄적으로 내보내기 위한 파일

// as 뒤에 본인이 사용하고 싶은 이름을 작성하면 된다.
// ex) 장바구니 라우터이면 export { default as CartRouter } from ~~~ 와 같은 식으로 작성하면 된다.

/**
 * domain 형식으로 진행되어 from 뒤에 폴더(도메인) 이름만 지정해 주어도 api가 연결된 router를 내보낸다.
 */
export { default as UserRouter } from './user';
export { default as TestRouter } from './test';