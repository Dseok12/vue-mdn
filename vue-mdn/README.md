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


## 3. 라우터 설정

라우터를 사용함으로써 SPA의 장점을 극대화할 수 있습니다.

라우터를 활용하여 url을 설정하면 조건에 맞는 컴포넌트만 불러와 페이지의 로딩 속도를 높일 수 있습니다.

### 라우터 기본 설정

https://router.vuejs.org/guide/

위 링크는 vue router의 공식문서 링크 입니다.

```bash
npm i vue-router@4
```

위 명령어로 vue-router를 설치합니다.

설치 후 main.js에 vue-router 사용 설정을 등록합니다.

- **main.js 라우터 설정**
    
    ```javascript
    import { createApp } from 'vue';
    import App from './App.vue';
    
    import router from '@routers/router'; // ## 라우터 적용 ##
    
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
    
    // ## 라우터 적용 ##
    app.use(router);
    
    // 앱 마운트
    app.mount('#app');
    
    ```
    

유지보수를 위해 src폴터 하위에 routers폴더를 생성하고, router.js파일을 만듭니다.

- **router.js 설정**
    
    ```javascript
    import { createRouter, createWebHistory } from 'vue-router';
    
    const routes = [
      // {path : '/', component : }
    ];
    
    const router = createRouter({
      history : createWebHistory(),
      routes,
    });
    
    export default router;
    ```
    

vue에서 주로 사용 되어야 할 태그입니다.

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

## 3. Vue.js의 for문

아래는 vue에서 사용하는 for문 예시입니다.

이해를 돕기 위해 한글로 변수를 만들어 사용한 부분도 있습니다.

- **for문 사용 예시**
    
    ```javascript
    /*
    예시 경로
    ./src/components/LeftNav.vue
    */
    <template>
      <div class="left-nav">
        <div class="left-nav__main-wrap">
          <ul class="left-nav__main-box">
            <li
              class="left-nav__item"
              v-for="원뎁스메뉴 in LeftNavMainArr" :key="원뎁스메뉴.id"
            >
              <a href="javascript:;" class="left-nav__link">
                {{ 원뎁스메뉴.title }}
              </a>
    
              <div class="left-nav__sub-wrap">
                <ul class="left-nav__sub-box">
                  <li
                    class="left-nav__sub-item"
                    v-for="투뎁스메뉴 in 원뎁스메뉴.children" :key="투뎁스메뉴.id"
                  >
                    <a href="javascript:;" class="left-nav__sub-link">
                      {{ 투뎁스메뉴.title }}
                    </a>
                  </li>
                </ul>
              </div>
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
          LeftNavMainArr: [
            {
              id: 'menu-intro',
              title: '소개',
              path: '/intro',
              children: [
                {
                  id: 'menu-intro-01',
                  title: '개요',
                  path: '/intro/summary'
                },
                {
                  id: 'menu-intro-02',
                  title: '디자인 원칙',
                  path: '/intro/design-rule'
                }
              ]
            },
            {
              id: 'menu-style-guide',
              title: '스타일 가이드',
              path: '/style-guide',
              children: [
                {
                  id: 'menu-style-guide-01',
                  title: '로고',
                  path: '/style-guide/logo'
                },
                /* ...생략*/
                {
                  id: 'menu-style-guide-05',
                  title: '아이콘',
                  path: '/style-guide/icon'
                }
              ]
            },
            {
              id: 'menu-component',
              title: '컴포넌트',
              path: '/component',
              children: [
                {
                  id: 'menu-component-01',
                  title: '배너',
                  path: '/component/banner'
                },
                /* ...생략*/
                {
                  id: 'menu-component-11',
                  title: '상품단',
                  path: '/component/product-list'
                }
              ]
            },
            {
              id: 'menu-project',
              title: '프로젝트',
              path: '/project',
              children: [
                {
                  id: 'menu-project-01',
                  title: '메가선생님',
                  path: '/project/mega-teacher'
                },
                /* ...생략*/
                {
                  id: 'menu-project-03',
                  title: '수능·내신',
                  path: '/project/exam-school'
                }
              ]
            }
          ]
        };
      }
    }
    </script>
    ```
    

위 예시에서 2depth 메뉴의 정보는 “children” 배열 안에 들어가 있습니다.

### 유지 · 보수를 위한 data분리

메뉴의 유지 · 보수성을 높이기 위해 데이터 형식으로 분리하였습니다.

1. 데이터가 누적되는 부분을 data/데이터이름.js로 분리합니다.
2. 데이터이름.js에서 export default를 합니다.
3. 데이터가 사용되어야 할 vue파일에서 <script></script> 태그 안에서
import 데이터이름 from “../data/데이터이름.js”를 실행합니다.
4. data(){} 함수에 state로 등록합니다.
5. 필요한 곳에 사용을 합니다.

아래는 예제 코드입니다.

- **데이터 분리 예제 코드**
    
    ```javascript
    // 1. src/data/LeftMenu.js 파일
    
    const LeftMenu = [
      {
        id: "menu-intro",
        title: "소개",
        path: "/intro",
        children: [
          {
            id: "menu-intro-01",
            title: "개요",
            path: "/intro/summary",
          },
          {
            id: "menu-intro-02",
            title: "디자인 원칙",
            path: "/intro/design-rule",
          },
        ],
      },
      {
        id: "menu-style-guide",
        title: "스타일 가이드",
        path: "/style-guide",
        children: [
          {
            id: "menu-style-guide-01",
            title: "로고",
            path: "/style-guide/logo",
          },
          /* ...생략 */
          {
            id: "menu-style-guide-05",
            title: "아이콘",
            path: "/style-guide/icon",
          },
        ],
      },
      {
        id: "menu-component",
        title: "컴포넌트",
        path: "/component",
        children: [
          {
            id: "menu-component-01",
            title: "배너",
            path: "/component/banner",
          },
          /* ...생략 */
          {
            id: "menu-component-11",
            title: "상품단",
            path: "/component/product-list",
          },
        ],
      },
      {
        id: "menu-project",
        title: "프로젝트",
        path: "/project",
        children: [
          {
            id: "menu-project-01",
            title: "메가선생님",
            path: "/project/mega-teacher",
          },
          /* ...생략 */
          {
            id: "menu-project-03",
            title: "수능·내신",
            path: "/project/exam-school",
          },
        ],
      },
    ];
    
    /* 2번 */
    export default LeftMenu;
    ```
    
    ```javascript
    <template>
      <div class="left-nav" :class="{ 'left-nav--fixed': isFixed }">
        <div class="left-nav__main-wrap">
          <ul class="left-nav__main-box">
            
            <li
              class="left-nav__item"
              <!-- 5. 필요한 곳에 사용을 합니다. -->
              v-for="원뎁스메뉴 in LeftNavMainArr" 
              :key="원뎁스메뉴.id"
              <!-- 5. 필요한 곳에 사용을 합니다. -->
            >
              <router-link
                :to="원뎁스메뉴.path"
                class="left-nav__link"
                active-class="left-nav__link--active"
                // @click.native="toggleMenu(원뎁스메뉴.id)"
              >
                {{ 원뎁스메뉴.title }}
              </router-link>
    
              <div 
                class="left-nav__sub-wrap" 
                :class="{ 'is-open': activeMenuId === 원뎁스메뉴.id }"
                v-if="원뎁스메뉴.children && 원뎁스메뉴.children.length > 0"
              >
                <div class="left-nav__sub-box">
                  <ul class="left-nav__sub-inner">
                    <li
                      class="left-nav__sub-item"
                      v-for="투뎁스메뉴 in 원뎁스메뉴.children" 
                      :key="투뎁스메뉴.id"
                    >
                      <router-link
                        :to="투뎁스메뉴.path"
                        class="left-nav__sub-link"
                        active-class="left-nav__sub-link--active"
                      >
                        {{ 투뎁스메뉴.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
    
          </ul>
        </div>
      </div>
    </template>
    
    <script>
    import '../css/components/LeftNav.css';
    /*
    	4. 데이터가 사용되어야 할 vue파일에서 <script></script> 태그 안에서
    	import 데이터이름 from “../data/데이터이름.js”를 실행합니다.
    */
    import LeftMenu from '../data/LeftMenu';
    
    export default {
      name: 'LeftNav',
      
      // 컴포넌트가 기억하고 있어야 할 상태(변수)들을 정의하는 곳입니다.
      data() {
        return {
    	    /* 5. data(){} 함수에 state로 등록합니다. */
          LeftNavMainArr: LeftMenu, 
        };
      },
    
      // 컴포넌트가 화면에 "처음 등장(Mount)"할 때 딱 한 번 실행되는 곳입니다.
      mounted() {
        
      },
    
      // 컴포넌트가 화면에서 "사라지기 직전(Destroy)"에 실행되는 곳입니다. (다른 페이지로 갈 때 등)
      beforeDestroy() {
        
      },
    
      // 사용할 기능(함수)들을 모아두는 곳입니다.
      methods: {
        
        }
      }
    }
    </script>
    ```
    

## 4. Vue.js의 if문


