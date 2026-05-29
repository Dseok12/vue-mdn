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
import SatGpa from '@pages/project/SatGpa.vue';
import UnivExam from '@pages/project/UniExam.vue';
import CollegeInfo from '@pages/project/CollegeInfo.vue';
import OnlineBookstore from '@pages/project/OnlineBookstore.vue';
import MegaCampaign from '@pages/project/MegaCampaign.vue';

/* @ 게시글 등록 */
// 💡 핵심 교정: Post.vue(부품)가 아니라 PostEditor.vue(전체 화면)를 불러옵니다!
import PostEditor from '@pages/posting/PostEditor.vue';
import ProjectPostEditor from '@pages/posting/ProjectPostEditor.vue'; // ✨ 프로젝트 전용 에디터 불러오기


const routes = [
  // 1. 기본 도메인 접속 시 첫 번째 메뉴로 자동 리다이렉트
  { path: '/', redirect: '/intro/summary' },

  // 2. 소개 (Intro)
  { path: '/intro/summary', name: 'IntroSummary', component: IntroSummary },
  { path: '/intro/designrule', name: 'IntroDesignRule', component: IntroDesignRule },

  // 3. 스타일 가이드 (Style Guide)
  { path: '/style-guide/logo', name: 'DefaultPage', component: DefaultPage },
  { path: '/style-guide/color', name: 'DefaultPage', component: DefaultPage },
  { path: '/style-guide/font', name: 'FontStyle', component: FontStyle },
  { path: '/style-guide/layout', name: 'DefaultPage', component: DefaultPage },
  { path: '/style-guide/icon', name: 'DefaultPage', component: DefaultPage },

  // 4. 컴포넌트 (Component)
  { path: '/component/banner', name: 'Banner', component: Banner },
  { path: '/component/quickmenu', name: 'QuickMenu', component: QuickMenu },
  { path: '/component/board', name: 'Board', component: Board },
  { path: '/component/tabmenu', name: 'TabMenu', component: TabMenu },
  { path: '/component/review', name: 'Review', component: Review },
  { path: '/component/event', name: 'Event', component: Event },
  { path: '/component/specialteachertab', name: 'SpecialTeacherTab', component: SpecialTeacherTab },
  { path: '/component/video', name: 'Video', component: Video },
  { path: '/component/popup', name: 'Popup', component: Popup },
  { path: '/component/coupon', name: 'Coupon', component: Coupon },

  // 5. 프로젝트 - 게시물아이템 (Project)
  { path: '/project/megateacher', name: 'MegaTeacher', component: MegaTeacher },
  { path: '/project/megapass', name: 'MegaPass', component: MegaPass },
  { path: '/project/examschool', name: 'SatGpa', component: SatGpa },
  { path: '/project/univexam', name: 'UnivExam', component: UnivExam },
  { path: '/project/examhighscool', name: 'CollegeInfo', component: CollegeInfo },
  { path: '/project/eventpromotion', name: 'DefaultPage', component: DefaultPage },
  { path: '/project/emarket', name: 'DefaultPage', component: DefaultPage },
  { path: '/project/megacampaign', name: 'MegaCampaign', component: MegaCampaign },
  { path: '/project/onlinebookstore', name: 'OnlineBookstore', component: OnlineBookstore },
  
  // 5-1. 프로젝트 - 게시물아이템 (Project)
  { path: '/project/megateacher/:id',  component: MegaTeacher },
  { path: '/project/megapass/:id',  component: MegaPass },
  { path: '/project/examschool/:id',  component: SatGpa },
  { path: '/project/univexam/:id',  component: UnivExam },
  { path: '/project/examhighscool/:id',  component: CollegeInfo },
  { path: '/project/eventpromotion/:id',  component: DefaultPage },
  { path: '/project/emarket/:id',  component: DefaultPage },
  { path: '/project/megacampaign/:id',  component: MegaCampaign },
  { path: '/project/onlinebookstore/:id',  component: OnlineBookstore },

  // 💡 핵심 교정: 여기서도 Post 가 아니라 PostEditor 를 연결합니다!
  { path: '/posting/post', name: 'PostEditor', component: PostEditor }, // 컴포넌트용
  { path: '/posting/projectpost', name: 'ProjectPostEditor', component: ProjectPostEditor }, // ✨ 프로젝트용 등록 화면 경로 추가
  
  { path: '/project/post/:id', component: DefaultPage },

  // 6. 404 Not Found (정의되지 않은 잘못된 경로 접근 시)
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;