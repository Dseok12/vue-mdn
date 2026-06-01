# Vue MDN 프로젝트로 배우는 Vue 기본 개념

작성일: 2026-06-01

이 문서는 현재 `vue-mdn` 프로젝트에서 실제로 사용된 Vue 개념과 기술을 학습용으로 정리한 문서입니다.

프로젝트는 Vue 3 기반이지만, 작성 방식은 주로 `Options API`입니다. `data`, `computed`, `methods`, `mounted`, `components` 같은 옵션을 객체 안에 작성하는 방식입니다.

## 1. Vue 애플리케이션 시작 구조

Vue 앱은 `main.js`에서 시작됩니다.

```js
// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from '@routers/router';

const app = createApp(App);

app.use(router);
app.mount('#app');
```

핵심 개념:

- `createApp(App)`: Vue 앱을 생성합니다.
- `App.vue`: 전체 앱의 최상위 컴포넌트입니다.
- `app.use(router)`: Vue Router를 앱에 연결합니다.
- `app.mount('#app')`: `index.html`의 `#app` 영역에 Vue 앱을 붙입니다.

쉽게 말하면 `main.js`는 “Vue 앱을 켜는 전원 버튼” 같은 파일입니다.

## 2. Single File Component 구조

Vue 파일은 보통 `.vue` 확장자를 사용하며, 하나의 파일 안에 화면, 로직, 스타일을 함께 작성할 수 있습니다.

```vue
<template>
  <div>화면에 보이는 HTML 영역</div>
</template>

<script>
export default {
  name: 'ComponentName'
}
</script>

<style>
/* 이 컴포넌트의 스타일 */
</style>
```

현재 프로젝트의 대부분 파일은 다음처럼 `template`과 `script`를 사용합니다.

```vue
<!-- frontend/src/components/TopHeader.vue -->
<template>
  <div class="top-header__wrap">
    ...
  </div>
</template>

<script>
import '../css/components/TopHeader.css';

export default {
  name: 'TopHeader'
}
</script>
```

이 구조 덕분에 “화면 단위”로 코드를 나누어 관리할 수 있습니다.

## 3. 최상위 레이아웃 컴포넌트

`App.vue`는 전체 화면의 큰 틀을 담당합니다.

```vue
<!-- frontend/src/App.vue -->
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

여기서 볼 수 있는 개념:

- `TopHeader`, `LeftNav`를 import해서 사용합니다.
- `components`에 등록해야 template에서 `<TopHeader />`처럼 사용할 수 있습니다.
- `<router-view />`는 현재 URL에 맞는 페이지 컴포넌트가 렌더링되는 자리입니다.

즉, `App.vue`는 고정 영역인 헤더/좌측 메뉴를 두고, 가운데 내용만 라우터에 따라 바뀌게 만든 구조입니다.

## 4. 컴포넌트 등록과 사용

Vue에서는 화면을 작은 컴포넌트로 나누어 재사용합니다.

예시:

```js
import TopHeader from '@components/TopHeader.vue';

export default {
  components: {
    TopHeader
  }
}
```

등록 후 template에서 사용합니다.

```vue
<TopHeader />
```

현재 프로젝트에서 컴포넌트는 크게 다음 역할로 나뉩니다.

- `TopHeader.vue`: 상단 메뉴
- `LeftNav.vue`: 좌측 메뉴
- `ProjectCard.vue`: 프로젝트 카드
- `PageComponentListItem.vue`: 컴포넌트 게시글 리스트 아이템
- `PostPreView.vue`: 게시글 미리보기

컴포넌트로 나누면 같은 UI를 여러 페이지에서 재사용할 수 있고, 코드가 한 파일에 몰리지 않습니다.

## 5. Vue Router

Vue Router는 URL에 따라 보여줄 페이지를 정하는 기술입니다.

```js
// frontend/src/routers/router.js
import { createRouter, createWebHistory } from 'vue-router';
import IntroSummary from '@pages/IntroSummary.vue';
import Banner from '@pages/component/Banner.vue';

const routes = [
  { path: '/', redirect: '/intro/summary' },
  { path: '/intro/summary', name: 'IntroSummary', component: IntroSummary },
  { path: '/component/banner', name: 'Banner', component: Banner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

핵심 개념:

- `path`: 브라우저 주소
- `name`: 라우트 이름
- `component`: 해당 주소에서 보여줄 Vue 컴포넌트
- `redirect`: 특정 주소로 자동 이동

예를 들어 사용자가 `/component/banner`로 접속하면 `Banner.vue`가 `<router-view />` 자리에 표시됩니다.

## 6. router-link

일반 HTML에서는 페이지 이동에 `<a>` 태그를 쓰지만, Vue Router에서는 보통 `<router-link>`를 사용합니다.

```vue
<router-link to="/component/banner">
  컴포넌트
</router-link>
```

현재 프로젝트 예시:

```vue
<!-- frontend/src/components/TopHeader.vue -->
<router-link
  to="/project/megateacher"
  class="top-header__nav-link"
  :class="{ 'top-header__nav-link--active': $route.path.startsWith('/project') }"
>
  프로젝트
</router-link>
```

`router-link`를 쓰면 새로고침 없이 화면만 부드럽게 바뀝니다.

## 7. 현재 라우트 정보: `$route`

`$route`는 현재 접속 중인 URL 정보를 담고 있습니다.

```vue
:class="{ 'top-header__nav-link--active': $route.path.startsWith('/project') }"
```

이 코드는 현재 주소가 `/project`로 시작하면 active 클래스를 붙입니다.

예시:

- 현재 주소: `/project/megateacher`
- `$route.path.startsWith('/project')`: `true`
- 결과: 프로젝트 메뉴에 active 클래스 적용

게시글 수정 모드에서도 `$route`를 사용합니다.

```js
computed: {
  isEditMode() {
    return !!this.$route.query.id;
  }
}
```

주소가 다음처럼 들어오면:

```txt
/posting/post?category=banner&id=123
```

`this.$route.query.id` 값이 있으므로 수정 모드가 됩니다.

## 8. data

`data()`는 화면에서 사용할 상태값을 정의하는 곳입니다.

```js
data() {
  return {
    isPopupOn: false,
    newLabel: '',
    formData: {
      title: '',
      tags: ['배너', '이벤트'],
      links: {
        board: '',
        pc: '',
        mo: '',
      },
    },
  };
}
```

현재 프로젝트에서는 `PostEditor.vue`에서 게시글 입력값을 `formData`로 관리합니다.

쉽게 말하면 `data()`는 컴포넌트가 기억해야 할 값을 담는 공간입니다.

## 9. v-model

`v-model`은 input 값과 Vue 데이터를 서로 연결합니다.

```vue
<input type="text" v-model="formData.title">
```

이 코드의 의미:

- 사용자가 input에 입력하면 `formData.title`이 자동 변경됩니다.
- 반대로 `formData.title` 값이 바뀌면 input에도 반영됩니다.

프로젝트 예시:

```vue
<input
  type="text"
  v-model="formData.links.pc"
  placeholder="백업된 next 링크를 입력하세요."
>
```

이 입력창은 `formData.links.pc`와 연결되어 있습니다.

## 10. v-if

`v-if`는 조건에 따라 화면을 보여주거나 숨깁니다.

```vue
<div class="go-back__popup-wrap" v-if="isPopupOn">
  ...
</div>
```

`isPopupOn`이 `true`면 팝업이 보이고, `false`면 보이지 않습니다.

버튼 클릭으로 값을 바꾸면 팝업을 열 수 있습니다.

```vue
<button @click="isPopupOn = true">취소</button>
```

## 11. v-for

`v-for`는 배열 데이터를 반복해서 화면에 출력합니다.

```vue
<span
  class="tag-item"
  v-for="(label, index) in formData.tags"
  :key="index"
>
  {{ label }}
</span>
```

`formData.tags`가 다음과 같다면:

```js
tags: ['배너', '이벤트']
```

화면에는 태그가 2개 출력됩니다.

메뉴 데이터도 같은 방식으로 반복 출력할 수 있습니다.

```js
// frontend/src/data/LeftMenu.js
const LeftMenu = [
  {
    id: "menu-component",
    title: "컴포넌트",
    path: "/component/banner",
    children: [
      { id: "menu-component-01", title: "배너", path: "/component/banner" },
      { id: "menu-component-02", title: "퀵메뉴", path: "/component/quickmenu" },
    ],
  },
];
```

이런 데이터 배열은 메뉴를 하드코딩하지 않고 반복 렌더링하기 좋습니다.

## 12. :속성 바인딩

Vue에서 HTML 속성에 JavaScript 값을 넣으려면 앞에 `:`를 붙입니다.

```vue
<img :src="displayItem.imgUrl" :alt="displayItem.title">
```

일반 HTML:

```html
<img src="image.jpg" alt="제목">
```

Vue 바인딩:

```vue
<img :src="item.imgUrl" :alt="item.title">
```

즉, `:`는 “고정 문자열이 아니라 Vue 데이터 값을 넣겠다”는 뜻입니다.

## 13. :class

`:class`는 조건에 따라 클래스를 붙일 때 사용합니다.

```vue
:class="{ 'top-header__nav-link--active': $route.path.startsWith('/component') }"
```

의미:

- 조건이 true면 `top-header__nav-link--active` 클래스 추가
- 조건이 false면 클래스 미적용

메뉴 활성화 UI에서 자주 사용됩니다.

## 14. 이벤트 처리: @click, @change, @keyup.enter

Vue에서는 이벤트 앞에 `@`를 붙입니다.

```vue
<button @click="savePost">저장하기</button>
```

이 버튼을 클릭하면 `methods`에 있는 `savePost()`가 실행됩니다.

파일 업로드 예시:

```vue
<input type="file" accept="image/*" @change="handleImageUpload">
```

엔터 입력 예시:

```vue
<input
  v-model="newLabel"
  @keyup.enter="addLabel"
  placeholder="태그 입력 후 엔터를 치세요"
>
```

`@keyup.enter`는 엔터키를 눌렀을 때만 실행됩니다.

## 15. methods

`methods`는 사용자의 행동에 반응하는 함수를 작성하는 곳입니다.

```js
methods: {
  addLabel() {
    const trimmedLabel = this.newLabel.trim();

    if (trimmedLabel && !this.formData.tags.includes(trimmedLabel)) {
      this.formData.tags.push(trimmedLabel);
    }

    this.newLabel = '';
  }
}
```

이 함수는:

1. 입력한 태그의 앞뒤 공백을 제거합니다.
2. 빈 값이 아니고 중복 태그가 아니면 배열에 추가합니다.
3. 입력창을 비웁니다.

`methods` 안에서는 `this.formData`, `this.newLabel`처럼 `data()`의 값에 접근합니다.

## 16. computed

`computed`는 기존 데이터를 바탕으로 계산된 값을 만들 때 사용합니다.

```js
computed: {
  isEditMode() {
    return !!this.$route.query.id;
  }
}
```

`isEditMode`는 주소에 `id`가 있는지 보고 등록 모드인지 수정 모드인지 판단합니다.

template에서는 일반 데이터처럼 사용할 수 있습니다.

```vue
<h2>{{ isEditMode ? '게시글 수정' : '게시글 등록' }}</h2>
```

`computed`는 단순히 함수를 실행하는 것이 아니라, 관련 데이터가 바뀔 때만 다시 계산됩니다.

## 17. mounted

`mounted()`는 컴포넌트가 화면에 처음 나타난 직후 실행됩니다.

```js
mounted() {
  if (this.isEditMode) {
    this.loadPostData(this.$route.query.id);
  }
}
```

현재 프로젝트에서는 수정 화면에 들어왔을 때 기존 게시글 데이터를 불러오기 위해 사용합니다.

흐름:

1. 사용자가 `/posting/post?category=banner&id=123` 접속
2. 컴포넌트가 화면에 표시됨
3. `mounted()` 실행
4. `isEditMode`가 true이므로 기존 게시글 로드

## 18. props

`props`는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용합니다.

예시:

```vue
<!-- 부모: PostEditor.vue -->
<PostPreview :post="formData" />
```

```js
// 자식: PostPreView.vue
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
```

의미:

- 부모의 `formData`를 자식에게 `post`라는 이름으로 넘깁니다.
- 자식은 `props.post` 또는 template에서 `post.title`처럼 사용할 수 있습니다.

프로젝트 카드도 같은 방식입니다.

```vue
<ProjectCard :item="formData" />
```

## 19. 자식에서 부모로 이벤트 전달: `$emit`

자식 컴포넌트가 부모에게 “어떤 일이 일어났다”고 알려줄 때 `$emit`을 사용합니다.

```js
// frontend/src/components/PageComponentListItem.vue
clickEdit() {
  this.$emit('edit', this.item);
},

clickDelete() {
  this.$emit('delete', this.item.id);
}
```

부모는 이렇게 받습니다.

```vue
<PageComponentListItem
  :item="게시물"
  @delete="게시물_삭제하기"
  @edit="게시물_수정하기"
/>
```

흐름:

1. 자식에서 수정 버튼 클릭
2. `this.$emit('edit', this.item)` 실행
3. 부모의 `게시물_수정하기` 함수 실행

이 구조는 리스트 아이템처럼 재사용되는 컴포넌트에서 특히 중요합니다.

## 20. import / export

Vue 프로젝트에서는 파일을 나누어 관리하기 때문에 `import`, `export`를 많이 씁니다.

메뉴 데이터 예시:

```js
// frontend/src/data/LeftMenu.js
const LeftMenu = [
  ...
];

export default LeftMenu;
```

사용하는 쪽:

```js
import LeftMenu from '../data/LeftMenu.js';
```

유틸 함수 예시:

```js
export { normalizePost };

export default {
  getAllPosts() {
    ...
  }
}
```

사용하는 쪽:

```js
import postManager, { normalizePost } from '@/utils/postManager.js';
```

여기서:

- `postManager`: default export
- `normalizePost`: named export

## 21. Alias 경로

현재 프로젝트는 Vite alias를 사용합니다.

```js
// frontend/vite.config.js
alias: {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@css': path.resolve(__dirname, 'src/css'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@routers': path.resolve(__dirname, 'src/routers'),
  '@utils': path.resolve(__dirname, 'src/utils'),
}
```

그래서 긴 상대 경로 대신 짧게 import할 수 있습니다.

```js
import TopHeader from '@components/TopHeader.vue';
import router from '@routers/router';
import postManager from '@utils/postManager.js';
```

장점:

- 경로가 짧아집니다.
- 파일 위치가 깊어져도 import가 덜 복잡해집니다.

## 22. localStorage

현재 프로젝트는 아직 백엔드 API와 완전히 연결되지 않았기 때문에 브라우저 `localStorage`에 게시글을 저장합니다.

```js
const STORAGE_KEY = 'megaDbPosts';

function readPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
```

`localStorage`는 브라우저에 데이터를 저장하는 기능입니다.

주의할 점:

- 브라우저별로 데이터가 따로 저장됩니다.
- 서버 데이터베이스가 아니므로 운영용 저장소로는 부족합니다.
- 객체/배열은 문자열로 바꿔 저장해야 해서 `JSON.stringify`, `JSON.parse`를 사용합니다.

## 23. 데이터 정규화

최근 프로젝트에서는 게시글 데이터 구조를 맞추기 위해 `normalizePost`를 사용합니다.

```js
function normalizePost(post = {}) {
  const links = post.links || {};
  const tags = post.tags || post.labels || [];

  return {
    ...post,
    type: post.type || 'component',
    tags,
    labels: post.labels || tags,
    links: {
      board: links.board || post.MegaProjectLink || '',
      pc: links.pc || post.PcLink || '',
      mo: links.mo || post.MoLink || '',
    },
  };
}
```

이 함수가 필요한 이유:

- 예전 데이터는 `labels`, `MegaProjectLink`, `PcLink`, `MoLink`를 사용했습니다.
- 새 데이터는 `tags`, `links.board`, `links.pc`, `links.mo`를 사용합니다.
- 둘이 섞여 있어도 화면이 깨지지 않게 하나의 형태로 맞춰줍니다.

이런 작업을 “데이터 정규화”라고 볼 수 있습니다.

## 24. 게시글 저장 흐름

`PostEditor.vue`의 저장 흐름은 다음과 같습니다.

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

흐름:

1. URL에서 카테고리를 읽습니다.
2. `id`가 있으면 수정 모드, 없으면 등록 모드입니다.
3. 게시글 데이터를 `postManager.savePost()`로 저장합니다.
4. 저장 후 해당 카테고리 목록으로 이동합니다.

## 25. this.$router.push

`this.$router.push()`는 코드로 페이지를 이동할 때 사용합니다.

```js
this.$router.push(`/component/${category}`);
```

예를 들어 `category`가 `banner`라면 다음 페이지로 이동합니다.

```txt
/component/banner
```

`router-link`가 사용자가 클릭해서 이동하는 방식이라면, `$router.push()`는 JavaScript 로직에서 이동시키는 방식입니다.

## 26. 파일 업로드와 FileReader

이미지 미리보기는 `FileReader`를 사용합니다.

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

흐름:

1. 사용자가 이미지 파일을 선택합니다.
2. `@change` 이벤트가 발생합니다.
3. `FileReader`가 파일을 읽습니다.
4. 읽은 결과를 `formData.imgUrl`에 넣습니다.
5. `imgUrl`을 사용하는 미리보기 이미지가 자동으로 바뀝니다.

## 27. Options API 전체 구조 정리

현재 프로젝트의 Vue 컴포넌트는 대체로 이런 구조입니다.

```js
export default {
  name: 'ComponentName',

  components: {
    ChildComponent
  },

  props: {
    item: Object
  },

  data() {
    return {
      title: '',
      isPopupOn: false
    };
  },

  computed: {
    isEditMode() {
      return !!this.$route.query.id;
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      ...
    },
    saveData() {
      ...
    }
  }
}
```

역할을 한 줄로 정리하면:

- `components`: 이 컴포넌트 안에서 사용할 자식 컴포넌트
- `props`: 부모에게서 받는 데이터
- `data`: 이 컴포넌트가 직접 관리하는 데이터
- `computed`: data나 route를 바탕으로 계산한 값
- `mounted`: 화면에 나타난 뒤 실행할 초기 작업
- `methods`: 클릭, 저장, 삭제 등 동작 함수

## 28. 이 프로젝트에서 사용된 주요 기술 목록

### Vue 3

화면을 컴포넌트 단위로 만들고 데이터 변경에 따라 화면을 자동 갱신하는 프론트엔드 프레임워크입니다.

### Vue Router

URL에 따라 페이지 컴포넌트를 교체하는 라우팅 라이브러리입니다.

### Vite

개발 서버와 빌드를 담당하는 프론트엔드 도구입니다. 빠른 실행과 번들링을 제공합니다.

### JavaScript Modules

`import`, `export`로 파일을 나누고 필요한 기능만 가져와 사용합니다.

### localStorage

현재 게시글 데이터를 임시 저장하는 브라우저 저장소입니다.

### CSS 분리

컴포넌트별 CSS를 별도 파일로 두고 import해서 사용합니다.

```js
import '../css/components/TopHeader.css';
```

## 29. 학습 순서 추천

이 프로젝트를 기준으로 Vue를 공부한다면 다음 순서가 좋습니다.

1. `main.js`에서 앱이 어떻게 시작되는지 보기
2. `App.vue`에서 전체 레이아웃 구조 이해하기
3. `router.js`에서 URL과 페이지 연결 방식 보기
4. `TopHeader.vue`에서 `router-link`, `$route`, `:class` 이해하기
5. `PostEditor.vue`에서 `data`, `v-model`, `methods`, `computed`, `mounted` 이해하기
6. `PostPreView.vue`에서 `props` 이해하기
7. `PageComponentListItem.vue`에서 `$emit` 이해하기
8. `postManager.js`에서 localStorage와 데이터 정규화 이해하기

## 30. 자주 헷갈리는 포인트

### `router-link`와 `$router.push`의 차이

- `router-link`: 사용자가 클릭하는 링크
- `$router.push`: 함수 안에서 코드로 이동

### `$route`와 `$router`의 차이

- `$route`: 현재 주소 정보
- `$router`: 페이지 이동 기능

### `v-if`와 `v-for`

- `v-if`: 조건에 따라 보이기/숨기기
- `v-for`: 배열을 반복해서 출력하기

### `props`와 `data`

- `props`: 부모에게 받은 값
- `data`: 컴포넌트가 직접 가진 값

### `computed`와 `methods`

- `computed`: 데이터에서 계산된 값을 만들 때
- `methods`: 클릭, 저장, 삭제 같은 행동을 처리할 때

## 31. 이 프로젝트를 이해하는 핵심 한 문장

이 프로젝트는 Vue Router로 페이지를 나누고, 컴포넌트로 화면을 쪼개며, `PostEditor`에서 입력한 데이터를 `postManager`를 통해 `localStorage`에 저장한 뒤, 각 목록/카드/미리보기 컴포넌트가 그 데이터를 받아 화면에 표시하는 구조입니다.

