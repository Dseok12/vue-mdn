# Vue 개념 정리

작성일: 2026-06-04

## 1. Vue 앱 시작점

Vue 앱은 `frontend/src/main.js`에서 시작됩니다.

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from '@routers/router';

import '@css/base/reset.css';
import '@css/base/base.css';
import '@css/base/common.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
```

핵심 개념은 다음과 같습니다.

- `createApp(App)`는 최상위 컴포넌트인 `App.vue`를 기준으로 Vue 앱을 만듭니다.
- `app.use(router)`는 Vue Router를 앱에 연결합니다.
- `app.mount('#app')`는 `index.html`의 `#app` 영역에 Vue 앱을 붙입니다.
- 전역 CSS는 `main.js`에서 import하면 앱 전체에 적용됩니다.

실전에서는 앱에서 공통으로 필요한 플러그인, 라우터, 전역 스타일을 `main.js`에서 연결합니다. 프로젝트가 커질수록 `main.js`는 앱 조립 지점 역할을 합니다.

## 2. Single File Component

Vue의 `.vue` 파일은 화면, 로직, 스타일을 하나의 컴포넌트 단위로 묶습니다.

기본 구조는 다음과 같습니다.

```vue
<template>
  <div>화면에 표시될 HTML</div>
</template>

<script>
export default {
  name: 'ExampleComponent'
}
</script>

<style>
/* 컴포넌트 스타일 */
</style>
```

프로젝트 예시는 `frontend/src/App.vue`에서 확인할 수 있습니다.

```vue
<template>
  <div class="appAllTotalWrap">
    <TopHeader />
    <div class="appContainerWrap">
      <LeftNav />
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import TopHeader from '@components/TopHeader.vue';
import LeftNav from '@components/LeftNav.vue';

export default {
  components: {
    TopHeader,
    LeftNav
  }
}
</script>
```

핵심 개념은 다음과 같습니다.

- `template`은 화면 구조를 담당합니다.
- `script`는 데이터, 메서드, 컴포넌트 등록을 담당합니다.
- `components`는 현재 컴포넌트 안에서 사용할 자식 컴포넌트를 등록합니다.
- `<router-view />`는 현재 URL에 맞는 페이지 컴포넌트가 들어오는 자리입니다.

실전에서는 `App.vue`가 전체 레이아웃을 잡고, 실제 페이지 내용은 라우터가 바꿔 끼우는 방식으로 구성합니다.

## 3. import와 alias

프로젝트는 Vite alias를 사용합니다.

`frontend/vite.config.js` 예시는 다음과 같습니다.

```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@css': path.resolve(__dirname, 'src/css'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@routers': path.resolve(__dirname, 'src/routers'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  }
}
```

사용 예시는 다음과 같습니다.

```js
import TopHeader from '@components/TopHeader.vue';
import postManager from '@utils/postManager.js';
import router from '@routers/router';
```

alias는 긴 상대경로를 짧고 명확하게 만듭니다. `../../../components` 같은 경로가 많아지는 것을 줄이고, 파일 이동과 유지보수를 쉽게 만듭니다.

## 4. Vue Router

Vue Router는 URL에 따라 어떤 컴포넌트를 보여줄지 정합니다.

프로젝트 예시는 `frontend/src/routers/router.js`에서 확인할 수 있습니다.

```js
import { createRouter, createWebHistory } from 'vue-router';
import IntroSummary from '@pages/IntroSummary.vue';
import Banner from '@pages/component/Banner.vue';
import NotFound from '@pages/NotFound.vue';

const routes = [
  { path: '/', redirect: '/intro/summary' },
  { path: '/intro/summary', name: 'IntroSummary', component: IntroSummary },
  { path: '/component/banner', name: 'Banner', component: Banner },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

핵심 개념은 다음과 같습니다.

- `path`는 브라우저 주소입니다.
- `name`은 라우트 이름입니다.
- `component`는 해당 주소에서 보여줄 컴포넌트입니다.
- `redirect`는 다른 주소로 자동 이동합니다.
- `/:pathMatch(.*)*`는 등록되지 않은 모든 URL을 처리합니다.

실전에서는 메뉴가 늘어나면 라우터도 함께 추가해야 합니다. 등록 페이지처럼 같은 화면을 여러 카테고리에서 쓰는 경우 query string을 활용할 수 있습니다.

```txt
/posting/post?category=banner
/posting/post?category=event
```

이 구조에서는 같은 `PostEditor.vue`를 사용하되, `category` 값으로 저장될 분류를 결정합니다.

## 5. router-link와 $router.push

페이지 이동에는 크게 두 방식이 있습니다.

`router-link`는 사용자가 클릭하는 링크를 만들 때 사용합니다.

```vue
<router-link to="/component/banner">
  배너
</router-link>
```

`this.$router.push()`는 JavaScript 로직 안에서 페이지를 이동시킬 때 사용합니다.

```js
this.$router.push(`/posting/post?category=${postData.category}&id=${postData.id}`);
```

사용자가 링크를 직접 클릭하는 경우에는 `router-link`를 사용합니다. 저장 완료, 수정 진입, 삭제 후 이동처럼 로직에서 이동하는 경우에는 `$router.push`를 사용합니다.

## 6. $route

`$route`는 현재 접속 중인 URL 정보를 담고 있습니다.

```js
computed: {
  isEditMode() {
    return !!this.$route.query.id;
  }
}
```

주소가 다음과 같다면 query 값을 읽을 수 있습니다.

```txt
/posting/post?category=banner&id=123
```

```js
this.$route.query.category // 'banner'
this.$route.query.id       // '123'
```

실전에서는 등록 화면과 수정 화면을 같은 컴포넌트로 만들 수 있습니다. `id`가 있으면 수정 모드, 없으면 등록 모드로 판단합니다.

## 7. data

`data()`는 컴포넌트가 관리하는 상태를 선언하는 곳입니다.

프로젝트 예시는 `PostEditor.vue`에서 확인할 수 있습니다.

```js
data() {
  return {
    isPopupOn: false,
    newLabel: '',
    formData: {
      type: 'component',
      title: '',
      manager: '',
      cssCode: '',
      deviceType: ['PC', 'MO'],
      tags: ['배너', '이벤트'],
      links: {
        board: '',
        pc: '',
        mo: '',
      },
      imgUrl: 'https://placehold.co/600x800'
    },
  };
}
```

`data()`는 객체를 반환해야 합니다. template에서 `formData.title`처럼 바로 사용할 수 있으며, 값이 바뀌면 화면도 자동으로 갱신됩니다.

## 8. v-model

`v-model`은 입력 요소와 Vue 데이터를 양방향으로 연결합니다.

```vue
<input type="text" v-model="formData.title">
```

사용자가 input에 입력하면 `formData.title`이 바뀝니다. 코드에서 `formData.title`을 바꾸면 input 값도 바뀝니다.

프로젝트에서는 다음과 같이 제목, 링크, CSS 코드 입력에 사용합니다.

```vue
<input type="text" v-model="formData.links.pc">
<textarea v-model="formData.cssCode"></textarea>
```

## 9. v-if

`v-if`는 조건에 따라 요소를 보여주거나 숨깁니다.

```vue
<div class="go-back__popup-wrap" v-if="isPopupOn">
  <div class="go-back__popup">
    <p>내용은 저장되지 않습니다. 취소하시겠습니까?</p>
  </div>
</div>
```

조건이 `true`면 렌더링됩니다. 조건이 `false`면 DOM에서 제거됩니다. 실전에서는 팝업 표시, 빈 목록 표시, 로딩 상태 표시, 권한별 버튼 표시에 사용할 수 있습니다.

## 10. v-for

`v-for`는 배열을 반복해서 화면에 출력합니다.

`Banner.vue` 예시는 다음과 같습니다.

```vue
<PageComponentListItem
  v-for="post in currentPosts"
  :key="post.id"
  :item="post"
  @delete="handleDelete"
  @edit="handleEdit"
/>
```

`currentPosts` 배열의 각 게시물을 `post`라는 이름으로 꺼냅니다. `:key`는 Vue가 각 항목을 구분하기 위해 필요합니다. 각 게시물마다 `PageComponentListItem` 컴포넌트를 하나씩 만듭니다.

## 11. 속성 바인딩

HTML 속성에 JavaScript 값을 넣을 때 `:`를 사용합니다.

```vue
<img :src="displayItem.imgUrl" :alt="displayItem.title">
<a :href="displayItem.links.pc" target="_blank">PC 링크</a>
```

클래스 바인딩 예시는 다음과 같습니다.

```vue
<router-link
  to="/component/banner"
  :class="{ 'top-header__nav-link--active': $route.path.startsWith('/component') }"
>
  컴포넌트
</router-link>
```

`src="..."`는 고정 문자열입니다. `:src="..."`는 Vue 데이터나 계산식을 넣습니다. `:class`는 조건에 따라 클래스를 붙일 때 유용합니다.

## 12. 이벤트 처리

Vue에서는 `@`로 이벤트를 연결합니다.

```vue
<button @click="savePost">저장하기</button>
<input type="file" @change="handleImageUpload">
<input v-model="newLabel" @keyup.enter="addLabel">
```

`@click`은 클릭 이벤트를 처리합니다. `@change`는 값 변경 이벤트를 처리합니다. `@keyup.enter`는 Enter 키 입력 이벤트를 처리합니다.

## 13. computed

`computed`는 기존 상태를 바탕으로 계산되는 값을 만들 때 사용합니다.

```js
computed: {
  isEditMode() {
    return !!this.$route.query.id;
  }
}
```

URL query에 `id`가 있으면 수정 모드가 됩니다. 없으면 등록 모드가 됩니다.

template에서는 다음과 같이 사용할 수 있습니다.

```vue
<h2>{{ isEditMode ? '게시물 수정' : '게시물 등록' }}</h2>
```

실전에서는 현재 라우트에 따른 active 상태, 검색 결과, 페이지네이션으로 잘라낸 목록, 입력값을 조합한 미리보기 데이터에 사용할 수 있습니다.

## 14. mounted

`mounted()`는 컴포넌트가 화면에 처음 붙은 뒤 실행됩니다.

```js
mounted() {
  if (this.isEditMode) {
    this.loadPostData(this.$route.query.id);
  }
}
```

실전에서는 목록 데이터 불러오기, 수정 화면에서 기존 게시물 불러오기, 현재 URL 기준으로 메뉴 상태 동기화, 외부 라이브러리 초기화에 사용할 수 있습니다.

## 15. methods

`methods`는 사용자의 행동이나 특정 로직을 처리하는 함수 모음입니다.

```js
methods: {
  loadPosts() {
    this.currentPosts = postManager.getPostsByCategory('banner');
  },

  handleDelete(deleteId) {
    postManager.deletePostById(deleteId);
    alert('삭제되었습니다.');
    this.loadPosts();
  },

  handleEdit(postData) {
    this.$router.push(`/posting/post?category=${postData.category}&id=${postData.id}`);
  }
}
```

버튼 클릭, 저장, 삭제, 이동 같은 행동은 `methods`에 둡니다. `this.currentPosts`, `this.$router`처럼 컴포넌트 인스턴스 값에 접근할 수 있습니다.

## 16. watch

`watch`는 특정 값이 바뀌었을 때 추가 작업을 실행합니다.

`ProjectListPage.vue` 예시는 다음과 같습니다.

```js
watch: {
  category() {
    this.currentPage = 1;
    this.loadPosts();
  }
}
```

`category` prop이 바뀌면 페이지를 1로 되돌리고 목록을 다시 불러옵니다. 실전에서는 검색어 변경, 라우트 변경, 필터 변경에 따른 목록 재조회에 사용할 수 있습니다.

## 17. props

props는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하는 방식입니다.

부모 예시는 다음과 같습니다.

```vue
<ProjectCard :item="project" />
```

자식 예시는 다음과 같습니다.

```js
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
```

프로젝트에서는 `ProjectListPage.vue`가 `ProjectCard.vue`에 프로젝트 데이터를 전달합니다. `Banner.vue`가 `PageComponentListItem.vue`에 게시물 데이터를 전달합니다. `PostEditor.vue`가 `PostPreView.vue`에 미리보기 데이터를 전달합니다.

## 18. emit

emit은 자식 컴포넌트가 부모 컴포넌트에게 이벤트를 전달하는 방식입니다.

자식 예시는 다음과 같습니다.

```js
methods: {
  clickEdit() {
    this.$emit('edit', this.item);
  },

  clickDelete() {
    this.$emit('delete', this.item.id);
  }
}
```

부모 예시는 다음과 같습니다.

```vue
<PageComponentListItem
  :item="post"
  @delete="handleDelete"
  @edit="handleEdit"
/>
```

흐름은 다음과 같습니다.

1. 자식에서 수정 버튼을 클릭합니다.
2. 자식이 `this.$emit('edit', this.item)`을 실행합니다.
3. 부모의 `handleEdit(postData)`가 실행됩니다.
4. 부모가 라우터로 수정 화면을 이동합니다.

데이터는 부모에서 자식으로 props로 내려갑니다. 이벤트는 자식에서 부모로 emit으로 올라갑니다.

## 19. localStorage

현재 프로젝트는 백엔드 연동 전 단계로 `localStorage`에 게시물을 저장합니다.

`postManager.js` 예시는 다음과 같습니다.

```js
const STORAGE_KEY = 'megaDbPosts';

function readPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
```

`localStorage`는 브라우저에 데이터를 저장합니다. 객체와 배열은 그대로 저장할 수 없으므로 `JSON.stringify`로 문자열화합니다. 다시 읽을 때는 `JSON.parse`로 객체/배열로 되돌립니다.

주의할 점은 사용자 브라우저마다 데이터가 다르다는 것입니다. 서버 저장소가 아니므로 팀원끼리 데이터가 공유되지 않습니다. 운영용 저장소로는 부족합니다.

## 20. 데이터 정규화

현재 프로젝트는 과거 필드명과 새 필드명을 함께 처리하기 위해 `normalizePost()`를 사용합니다.

```js
function normalizePost(post = {}) {
  const links = post.links || {};
  const tags = post.tags || post.labels || [];
  const createdAt = post.createdAt || post.date || new Date().toISOString().split('T')[0];

  return {
    ...post,
    type: post.type || 'component',
    tags,
    labels: post.labels || tags,
    thumbnailUrl: post.thumbnailUrl || post.imgUrl || 'https://placehold.co/600x800',
    imgUrl: post.imgUrl || post.thumbnailUrl || 'https://placehold.co/600x800',
    links: {
      board: links.board || post.MegaProjectLink || '',
      pc: links.pc || post.PcLink || '',
      mo: links.mo || post.MoLink || '',
    },
    createdAt,
    updatedAt: post.updatedAt || createdAt,
    date: post.date || createdAt,
  };
}
```

데이터 구조가 바뀌어도 화면이 깨지지 않게 중간에서 맞춰줍니다. 컴포넌트마다 예외 처리를 반복하지 않고 유틸 함수 한 곳에서 처리합니다.

## 21. 게시물 저장 흐름

`PostEditor.vue` 예시는 다음과 같습니다.

```js
savePost() {
  const category = this.$route.query.category || 'common';
  const editId = this.$route.query.id;
  const now = new Date().toISOString().split('T')[0];

  if (this.isEditMode) {
    postManager.savePost({
      ...this.formData,
      id: Number(editId),
      type: 'component',
      category,
      updatedAt: now,
    });
  } else {
    postManager.savePost({
      ...this.formData,
      id: Date.now(),
      type: 'component',
      category,
      createdAt: now,
      updatedAt: now,
      date: now,
    });
  }

  this.$router.push(`/component/${category}`);
}
```

흐름은 다음과 같습니다.

1. URL query에서 `category`와 `id`를 읽습니다.
2. `id`가 있으면 수정 모드로 저장합니다.
3. `id`가 없으면 새 게시물 ID를 만들어 등록합니다.
4. 저장 후 해당 카테고리 목록으로 이동합니다.

하나의 컴포넌트로 등록과 수정을 함께 처리할 수 있습니다. URL query가 화면 동작을 결정하는 중요한 입력값이 될 수 있습니다.

## 22. 이미지 미리보기와 FileReader

프로젝트 예시는 다음과 같습니다.

```js
handleImageUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.formData.imgUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
```

사용자가 선택한 파일은 input의 `files`에서 읽습니다. `FileReader`로 이미지 파일을 base64 URL로 변환합니다. 변환된 값을 `formData.imgUrl`에 넣으면 미리보기 이미지가 바뀝니다.

base64 이미지는 간단한 미리보기에는 좋지만 운영 저장 방식으로는 무겁습니다. 실제 서비스에서는 업로드 API와 파일 저장소를 사용하는 것이 좋습니다.

## 23. 공통 컴포넌트 설계

현재 프로젝트에서 좋은 예시는 `ProjectListPage.vue`입니다.

사용 예시는 다음과 같습니다.

```vue
<template>
  <ProjectListPage title="메가선생님" category="megateacher" />
</template>

<script>
import ProjectListPage from '@components/ProjectListPage.vue';

export default {
  components: {
    ProjectListPage
  }
}
</script>
```

목록 조회, 페이징, 빈 상태 UI는 공통으로 처리합니다. 각 프로젝트 페이지는 `title`, `category`만 다르게 전달합니다. 이렇게 하면 중복 코드를 줄이고 새 카테고리를 쉽게 추가할 수 있습니다.

컴포넌트 카테고리 페이지도 같은 방식으로 `ComponentListPage`로 공통화할 수 있습니다. `Banner.vue`, `Event.vue`, `Coupon.vue` 등이 같은 구조라면 wrapper만 남기는 방식이 좋습니다.

## 24. Vue 학습자가 꼭 잡아야 할 흐름

이 프로젝트에서 가장 중요한 데이터 흐름은 다음과 같습니다.

```txt
사용자 입력
-> v-model로 formData 변경
-> savePost 메서드 실행
-> postManager.savePost 호출
-> localStorage에 저장
-> 목록 페이지로 이동
-> postManager.getPostsByCategory로 다시 조회
-> v-for로 목록 렌더링
```

수정 흐름은 다음과 같습니다.

```txt
목록에서 수정 버튼 클릭
-> 자식 컴포넌트가 emit('edit') 호출
-> 부모 handleEdit 실행
-> /posting/post?category=...&id=... 이동
-> PostEditor mounted 실행
-> id 기준으로 기존 게시물 조회
-> formData에 기존 데이터 세팅
-> 사용자가 수정 후 저장
```

이 흐름을 설명할 수 있으면 Vue의 실전 기본기는 상당 부분 잡힌 것입니다.

## 25. 다음에 확장해서 배울 개념

현재 프로젝트를 바탕으로 다음 개념까지 확장할 수 있습니다.

- Composition API를 배울 수 있습니다.
- Pinia 상태 관리를 배울 수 있습니다.
- API 호출과 비동기 처리를 배울 수 있습니다.
- Axios 또는 fetch를 배울 수 있습니다.
- Form validation을 배울 수 있습니다.
- Vue 컴포넌트 테스트를 배울 수 있습니다.
- 라우터 가드를 배울 수 있습니다.
- 관리자 인증을 배울 수 있습니다.
- 서버 API와 DB 연동을 배울 수 있습니다.
- 이미지 업로드를 배울 수 있습니다.

학습 순서는 현재 프로젝트의 Options API와 Router, CRUD 흐름을 먼저 안정적으로 이해한 뒤 확장하는 것이 좋습니다.
