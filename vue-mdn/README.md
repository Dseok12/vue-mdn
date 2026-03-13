# 기본 설정
---
## 1. vite로 설정

```bash
npm create vite@latest
```
프로젝트가 실행 되는 <b>외부적인 환경을 설정</b> 할 수 있습니다.<br/>
백엔드와 포트번호를 맞춰 cors에러가 나지않게 합니다.<br/>
vite.config.js에서 원하는 <b>포트 번호 및 절대 경로</b>를 입력 할 수 있습니다.<br/>

> vite.config.js 설정
```javascript
/**
 * 폴더트리 기준 Alias
 * - @  : /src
 * - @api : /src/api
 * - @components : /src/components
 * - @css : /src/css
 * - @layouts : /src/layouts
 * - @pages : /src/pages
 * - @routers : /src/routers
 * - @stores : /src/stores
 * 
 * 사용 예시
 * import router from '@routers'
 * import router from '@routers/index.js'
 * 
 * import http from '@api/http'
 * import '@css/base/reset.css'
 * import '@css/common/style.css'
 * import Header from '@components/common/Header.vue'
 */
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),

      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@css': path.resolve(__dirname, 'src/css'),

      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),

      '@routers': path.resolve(__dirname, 'src/routers'),
      '@stores': path.resolve(__dirname, 'src/stores'),
    }
  },

  server: {
    port: 3000,
    strictPort: true
  },

  preview: {
    port: 3000,
    strictPort: true
  }
})
```
위와 같이 기본적인 설정은 vite.config.js에 설정을 할 수 있습니다.<br/>
server와 preview의 port의 숫자를 변경을 하면 "http://localhost:원하는숫자"의 형식으로 변경 할 수 있습니다.



## 2. main.js설정

main.js는 <b>프로젝트의 내부적인 환경을 설정</b>합니다.<br/>
전역으로 사용되어야할 css, 라이브러리, 미들웨어 등을 등록할 수 있습니다.

```javascript
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
```
위와 같이 프로젝트가 실제로 실행되고 있을 때 사용되는 기본 설정입니다.<br/>
vite.config.js와는 다른 개념입니다.