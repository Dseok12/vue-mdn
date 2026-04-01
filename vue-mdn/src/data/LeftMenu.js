// src/data/LeftMenu.js 파일

const LeftMenu = [
  {
    id: "menu-intro",
    title: "소개",
    path: "/intro/summary",
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
    path: "/style-guide/logo",
    children: [
      {
        id: "menu-style-guide-01",
        title: "로고",
        path: "/style-guide/logo",
      },
      {
        id: "menu-style-guide-02",
        title: "색상",
        path: "/style-guide/color",
      },
      {
        id: "menu-style-guide-03",
        title: "서체",
        path: "/style-guide/font",
      },
      {
        id: "menu-style-guide-04",
        title: "레이아웃",
        path: "/style-guide/layout",
      },
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
    path: "/component/banner",
    children: [
      {
        id: "menu-component-01",
        title: "배너",
        path: "/component/banner",
      },
      {
        id: "menu-component-02",
        title: "퀵메뉴",
        path: "/component/quick-menu",
      },
      {
        id: "menu-component-03",
        title: "게시판",
        path: "/component/board",
      },
      {
        id: "menu-component-04",
        title: "탭메뉴",
        path: "/component/tab-menu",
      },
      {
        id: "menu-component-05",
        title: "수강평",
        path: "/component/review",
      },
      {
        id: "menu-component-06",
        title: "이벤트",
        path: "/component/event",
      },
      {
        id: "menu-component-07",
        title: "기획전 선생님 탭메뉴",
        path: "/component/special-teacher-tab",
      },
      {
        id: "menu-component-08",
        title: "동영상",
        path: "/component/video",
      },
      {
        id: "menu-component-09",
        title: "팝업",
        path: "/component/popup",
      },
      {
        id: "menu-component-10",
        title: "쿠폰",
        path: "/component/coupon",
      },
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
    path: "/project/mega-teacher",
    children: [
      {
        id: "menu-project-01",
        title: "메가선생님",
        path: "/project/mega-teacher",
      },
      {
        id: "menu-project-02",
        title: "메가패쓰",
        path: "/project/mega-pass",
      },
      {
        id: "menu-project-03",
        title: "수능·내신",
        path: "/project/exam-school",
      },
    ],
  },
];

export default LeftMenu;