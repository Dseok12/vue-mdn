import { createRouter, createWebHistory } from 'vue-router';

// 변수 대신 vite.config.js에 설정해둔 Alias(@pages)를 활용한 경로 설정
import DefaultPage from '@pages/DefaultPage.vue';
import NotFound from '@pages/NotFound.vue';

/* @ 소개 컴포넌트 등록 */
import IntroSummary from '@pages/IntroSummary.vue';
import IntroDesignRule from '@pages/IntroDesignRule.vue';

/* @ 스타일가이드 컴포넌트 등록 */
import FontStyle from '@pages/styleguide/FontStyle.vue';

/* @ 배너 컴포넌트 등록 */
import Banner from '@pages/component/Banner.vue';
import QuickMenu from '@pages/component/QuickMenu.vue';
import Board from '@pages/component/Board.vue';
import TabMenu from '@pages/component/TabMenu.vue';
import Review from '@pages/component/Review.vue';
import Event from '@pages/component/Event.vue';
import SpecialTeacherTab from '@pages/component/SpecialTeacherTab.vue';
import Video from '@pages/component/Video.vue';
import Popup from '@pages/component/Popup.vue';
import Coupon from '@pages/component/Coupon.vue';
import ProductList from '@pages/component/ProductList.vue';

/* @ 프로젝트 컴포넌트 등록 */
import MegaTeacher from '@pages/project/MegaTeacher.vue';
import MegaPass from '@pages/project/MegaPass.vue';
// 💡 교정: ../pages 상대경로로 섞여 있던 것을 @pages Alias로 통일했습니다.
import SatGpa from '@pages/project/SatGpa.vue';
import UnivExam from '@pages/project/UniExam.vue';
import CollegeInfo from '@pages/project/CollegeInfo.vue';
import OnlineBookstore from '@pages/project/OnlineBookstore.vue';
import MegaCampaign from '@pages/project/MegaCampaign.vue';

/* @ 게시글 등록 */
// 💡 핵심 교정: Post.vue(부품)가 아니라 PostEditor.vue(전체 화면)를 불러옵니다!
import PostEditor from '@pages/posting/PostEditor.vue';


const routes = [
  // 1. 기본 도메인 접속 시 첫 번째 메뉴로 자동 리다이렉트
  { path: '/', redirect: '/intro/summary' },

  // 2. 소개 (Intro)
  { path: '/intro/summary', component: IntroSummary },
  { path: '/intro/design-rule', component: IntroDesignRule },

  // 3. 스타일 가이드 (Style Guide)
  { path: '/style-guide/logo', component: DefaultPage },
  { path: '/style-guide/color', component: DefaultPage },
  { path: '/style-guide/font', component: FontStyle },
  { path: '/style-guide/layout', component: DefaultPage },
  { path: '/style-guide/icon', component: DefaultPage },

  // 4. 컴포넌트 (Component)
  { path: '/component/banner', component: Banner },
  { path: '/component/quick-menu', component: QuickMenu },
  { path: '/component/board', component: Board },
  { path: '/component/tab-menu', component: TabMenu },
  { path: '/component/review', component: Review },
  { path: '/component/event', component: Event },
  { path: '/component/special-teacher-tab', component: SpecialTeacherTab },
  { path: '/component/video', component: Video },
  { path: '/component/popup', component: Popup },
  { path: '/component/coupon', component: Coupon },
  { path: '/component/product-list', component: ProductList },

  // 4-1. 컴포넌트 - 게시물아이템 (Component)
  { path: '/component/banner/:megarandom', component: DefaultPage },
  { path: '/component/quick-menu/:megarandom', component: DefaultPage },
  { path: '/component/board/:megarandom', component: DefaultPage },
  { path: '/component/tab-menu/:megarandom', component: DefaultPage },
  { path: '/component/review/:megarandom', component: DefaultPage },
  { path: '/component/event/:megarandom', component: DefaultPage },
  { path: '/component/special-teacher-tab/:megarandom', component: DefaultPage },
  // 💡 교정: vmegarandomeo 라는 오타를 video로 바로잡았습니다!
  { path: '/component/video/:megarandom', component: DefaultPage }, 
  { path: '/component/popup/:megarandom', component: DefaultPage },
  { path: '/component/coupon/:megarandom', component: DefaultPage },
  { path: '/component/product-list/:megarandom', component: DefaultPage },

  // 5. 프로젝트 (Project)
  { path: '/project/mega-teacher', component: MegaTeacher },
  { path: '/project/mega-pass', component: MegaPass },
  { path: '/project/exam-school', component: SatGpa },
  { path: '/project/univ-exam', component: UnivExam },
  { path: '/project/exam-highscool', component: CollegeInfo },
  { path: '/project/event-promotion', component: DefaultPage },
  { path: '/project/e-market', component: OnlineBookstore },
  { path: '/project/mega-campaign', component: MegaCampaign },

  // 5-1. 프로젝트 - 게시물아이템 (Project)
  { path: '/project/mega-teacher/:id', component: DefaultPage },
  { path: '/project/mega-pass/:id', component: DefaultPage },
  { path: '/project/exam-school/:id', component: DefaultPage },
  { path: '/project/univ-exam/:id', component: DefaultPage },
  { path: '/project/exam-highscool/:id', component: DefaultPage },
  { path: '/project/event-promotion/:id', component: DefaultPage },
  { path: '/project/e-market/:id', component: DefaultPage },
  { path: '/project/mega-campaign/:id', component: DefaultPage },

  // 💡 핵심 교정: 여기서도 Post 가 아니라 PostEditor 를 연결합니다!
  { path: '/posting/post', component: PostEditor },
  
  { path: '/project/post/:id', component: DefaultPage },

  // 6. 404 Not Found (정의되지 않은 잘못된 경로 접근 시)
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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