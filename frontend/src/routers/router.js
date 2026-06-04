import { createRouter, createWebHistory } from 'vue-router';

import DefaultPage from '@pages/DefaultPage.vue';
import NotFound from '@pages/NotFound.vue';

import IntroSummary from '@pages/IntroSummary.vue';
import IntroDesignRule from '@pages/IntroDesignRule.vue';
import FontStyle from '@pages/styleguide/FontStyle.vue';

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

import MegaTeacher from '@pages/project/MegaTeacher.vue';
import MegaPass from '@pages/project/MegaPass.vue';
import SatGpa from '@pages/project/SatGpa.vue';
import UnivExam from '@pages/project/UniExam.vue';
import CollegeInfo from '@pages/project/CollegeInfo.vue';
import OnlineBookstore from '@pages/project/OnlineBookstore.vue';
import MegaCampaign from '@pages/project/MegaCampaign.vue';
import EventPromotion from '@pages/project/EventPromotion.vue';

import PostEditor from '@pages/posting/PostEditor.vue';
import ProjectPostEditor from '@pages/posting/ProjectPostEditor.vue';
import PostDetail from '@pages/posting/PostDetail.vue';

const routes = [
  { path: '/', redirect: '/intro/summary' },

  { path: '/intro/summary', name: 'IntroSummary', component: IntroSummary },
  { path: '/intro/designrule', name: 'IntroDesignRule', component: IntroDesignRule },

  { path: '/style-guide/logo', name: 'StyleGuideLogo', component: DefaultPage },
  { path: '/style-guide/color', name: 'StyleGuideColor', component: DefaultPage },
  { path: '/style-guide/font', name: 'FontStyle', component: FontStyle },
  { path: '/style-guide/layout', name: 'StyleGuideLayout', component: DefaultPage },
  { path: '/style-guide/icon', name: 'StyleGuideIcon', component: DefaultPage },

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
  { path: '/component/productlist', name: 'ProductList', component: ProductList },
  {
    path: '/component/:category/:id',
    name: 'ComponentPostDetail',
    component: PostDetail,
    meta: { type: 'component' },
  },

  { path: '/project/megateacher', name: 'MegaTeacher', component: MegaTeacher },
  { path: '/project/megapass', name: 'MegaPass', component: MegaPass },
  { path: '/project/examschool', name: 'SatGpa', component: SatGpa },
  { path: '/project/univexam', name: 'UnivExam', component: UnivExam },
  { path: '/project/examhighscool', name: 'CollegeInfo', component: CollegeInfo },
  { path: '/project/eventpromotion', name: 'EventPromotion', component: EventPromotion },
  { path: '/project/onlinebookstore', name: 'OnlineBookstore', component: OnlineBookstore },
  { path: '/project/megacampaign', name: 'MegaCampaign', component: MegaCampaign },
  {
    path: '/project/:category/:id',
    name: 'ProjectPostDetail',
    component: PostDetail,
    meta: { type: 'project' },
  },

  { path: '/posting/post', name: 'PostEditor', component: PostEditor },
  { path: '/posting/projectpost', name: 'ProjectPostEditor', component: ProjectPostEditor },

  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  }
});

export default router;
