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
---

# 기본 문법

## 1. 데이터바인딩

데이터바인딩은 vue의 기본적인 개념으로 다양하게 사용이 가능합니다.
아래는 기본 사용법입니다.
```javascript
// 예전 문법, 하지만 여전히 많이 사용
<template>
  <h1>{{ hello }}</h1>
</template>

<script>
export default {
  data() {
    return {
      hello: 'Hello, Vue!',
    }
  }
}
</script>
```
vue는 스크립트 태그 안에 기본적으로 export default안에 data(){} 함수를 통해서 작동을 하게 됩니다.
data(){} 함수 안에는 다양한 내용들이 들어갑니다.
그 중에 처음으로 vue를 시작하게 되면 데이터바인딩부터 시작을 합니다.

사용법은 위 코드의 내용과 같습니다.

하지만 요즘 vue3에서 사용하는 방식은 많이 다릅니다.
```javascript
// 새로운 방법의 vue, 실제 서비스 되고 있는 페이지들이 이렇게 사용되고 있는지는 알 수 없음.
<template>
  <h1>{{ hello }}</h1>
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
const isLoading = ref(false);
const hello = ref('Hello, Vue!');
const users = ref([]);
const form = ref({
  title: '',
  content: '',
  writer: ''
});

// 객체
const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    writer: ''
  }
}

// 배열
const loadUsers = async () => {
  users.value = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
  ]
}
console.log(hello.value);
</script>
```
export default 문법을 사용하지 않고 vue에서 ref함수를 import해서 사용을 합니다.
예제 코드는 위 코드와 같습니다.
공식 문서에서도 위와 같이 코드를 다루고 있습니다.
### ref()의 간단 설명
ref()에는 객체, 문자, 숫자, 불리언, 배열, null, 함수 등이 들어갈 수 있습니다.
ref()와 비슷하게 사용되지만 사용법이 다른 reactive() 내장객체가 있습니다.
ref()는 한 개의 데이터를 변경하고 싶을 때 사용을 합니다.
reactive()는 추후에 다루도록 하겠습니다.
ref()의 값을 확인 하고자 할 때는 변수에 .value를 붙혀서 확인이 가능합니다.
예전의 방식에서는 함수를 등록하는 방법이 다릅니다.
이 또한 추후에 다루도록 하겠습니다.

우선 코딩애플에 나온 방식으로 진행을 하겠습니다.

## 2. 컴포넌트
- vue 컴포넌트만들기

원칙
1. 원하는 부분을 가지고 vue파일을 만든다.
2. 컴포넌트가 보여야할 파일에 import를 하고, 컴포넌트를 등록을 한다.
3. 컴포넌트 등록은 2가지로 나뉜다. data(){}에 등록 <Menu/> 형식으로 등록.

아래는 left 메뉴의 컴포넌트를 등록한 코드입니다.

```javascript
// App.js
<template>
  <LeftNav /> // 등록
</template>
<script>
import LeftNav from '@components/LeftNav.vue'; // 등록
export default {
  components: {
    LeftNav // 등록
  },
  data() {
    return {
      
    }
  }
}
</script>
```

```javascript
// src/components/LeftNav.vue 
<template>
  <div class="left-nav">
    <div class="left-nav__main-wrap">
      <ul class="left-nav__main-box">
        <li class="left-nav__item">
          <a href="javascript:;" class="left-nav__link">소개</a>
        </li>
        <li class="left-nav__item">
          <a href="javascript:;" class="left-nav__link">스타일 가이드</a>
        </li>
        <li class="left-nav__item">
          <a href="javascript:;" class="left-nav__link">컴포넌트</a>
        </li>
        <li class="left-nav__item">
          <a href="javascript:;" class="left-nav__link">프로젝트</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import '@css/components/LeftNav.css';
export default {
  name: 'LeftNav',
  data() {
    return {
 
    }
  }
}
</script>
```

컴포넌트를 등록하는 방법이였습니다.




