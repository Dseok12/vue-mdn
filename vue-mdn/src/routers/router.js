import { createRouter, createWebHistory } from 'vue-router';
// 변수 대신 vite.config.js에 설정해둔 Alias(@pages)를 활용한 경로 설정
import DefaultPage from '@pages/DefaultPage.vue';
import NotFound from '@pages/NotFound.vue';

import IntroSummary from '@pages/IntroSummary.vue';
import IntroDesignRule from '@pages/IntroDesignRule.vue';



const routes = [
  // 1. 기본 도메인 접속 시 첫 번째 메뉴로 자동 리다이렉트
  { path: '/', redirect: '/intro/summary' },

  // 2. 소개 (Intro)
  { path: '/intro/summary', component: IntroSummary },
  { path: '/intro/design-rule', component: IntroDesignRule },

  // 3. 스타일 가이드 (Style Guide)
  { path: '/style-guide/logo', component: DefaultPage },
  { path: '/style-guide/color', component: DefaultPage },
  { path: '/style-guide/font', component: DefaultPage },
  { path: '/style-guide/layout', component: DefaultPage },
  { path: '/style-guide/icon', component: DefaultPage },

  // 4. 컴포넌트 (Component)
  { path: '/component/banner', component: DefaultPage },
  { path: '/component/quick-menu', component: DefaultPage },
  { path: '/component/board', component: DefaultPage },
  { path: '/component/tab-menu', component: DefaultPage },
  { path: '/component/review', component: DefaultPage },
  { path: '/component/event', component: DefaultPage },
  { path: '/component/special-teacher-tab', component: DefaultPage },
  { path: '/component/video', component: DefaultPage },
  { path: '/component/popup', component: DefaultPage },
  { path: '/component/coupon', component: DefaultPage },
  { path: '/component/product-list', component: DefaultPage },

  // 4-1. 컴포넌트 - 게시물아이템 (Component)
  { path: '/component/banner/:megarandom', component: DefaultPage },
  { path: '/component/quick-menu/:megarandom', component: DefaultPage },
  { path: '/component/board/:megarandom', component: DefaultPage },
  { path: '/component/tab-menu/:megarandom', component: DefaultPage },
  { path: '/component/review/:megarandom', component: DefaultPage },
  { path: '/component/event/:megarandom', component: DefaultPage },
  { path: '/component/special-teacher-tab/:megarandom', component: DefaultPage },
  { path: '/component/vmegarandomeo/:megarandom', component: DefaultPage },
  { path: '/component/popup/:megarandom', component: DefaultPage },
  { path: '/component/coupon/:megarandom', component: DefaultPage },
  { path: '/component/product-list/:megarandom', component: DefaultPage },

  // 5. 프로젝트 (Project)
  { path: '/project/mega-teacher', component: DefaultPage },
  { path: '/project/mega-pass', component: DefaultPage },
  { path: '/project/exam-school', component: DefaultPage },
  { path: '/project/univ-exam', component: DefaultPage },
  { path: '/project/exam-highscool', component: DefaultPage },
  { path: '/project/event-promotion', component: DefaultPage },
  { path: '/project/e-market', component: DefaultPage },
  { path: '/project/mega-campaign', component: DefaultPage },

  // 5-1. 프로젝트 - 게시물아이템 (Project)
  { path: '/project/mega-teacher/:id', component: DefaultPage },
  { path: '/project/mega-pass/:id', component: DefaultPage },
  { path: '/project/exam-school/:id', component: DefaultPage },
  { path: '/project/univ-exam/:id', component: DefaultPage },
  { path: '/project/exam-highscool/:id', component: DefaultPage },
  { path: '/project/event-promotion/:id', component: DefaultPage },
  { path: '/project/e-market/:id', component: DefaultPage },
  { path: '/project/mega-campaign/:id', component: DefaultPage },

  // 6. 404 Not Found (정의되지 않은 잘못된 경로 접근 시)
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  /**/
  // 라우트 이동 시 항상 화면 맨 위로 스크롤 이동
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
  
});

export default router;