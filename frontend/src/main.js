import { createApp } from 'vue';
import App from './App.vue';

import router from '@routers/router';

// 전역에 reset.css ,base.css, common.css 적용
import '@css/base/reset.css';
import '@css/base/base.css';
import '@css/base/common.css';

// 추후 미들웨어 적용 시 편리하게 하기 위해 app변수 생성
const app = createApp(App);

/*
  * 아래와 같은 방식입니다.
  * 한 줄 계속 시작하게 되면 추후에 추가가 계속 되면 코드가 한 줄로 길어지기 때문에 가독성을 위해 여러 줄로 설정을 하면 좋습니다.
  * app.use(router).mount('#app');
*/

// 라우터 적용
app.use(router);

// 앱 마운트
app.mount('#app');

