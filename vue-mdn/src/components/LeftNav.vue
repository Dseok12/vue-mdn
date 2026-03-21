<template>
  <div class="left-nav" :class="{ 'left-nav--fixed': isFixed }">
    <div class="left-nav__main-wrap">
      <ul class="left-nav__main-box">
        
        <li
          class="left-nav__item"
          v-for="원뎁스메뉴 in LeftNavMainArr" 
          :key="원뎁스메뉴.id"
        >
          <router-link
            :to="원뎁스메뉴.path"
            class="left-nav__link"
            active-class="left-nav__link--active"
            @click.native="toggleMenu(원뎁스메뉴.id)"
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
// 외부에서 만들어둔 메뉴 데이터 파일을 불러옵니다.
import '../css/components/LeftNav.css';
import LeftMenu from '../data/LeftMenu';

export default {
  name: 'LeftNav',
  
  // 컴포넌트가 기억하고 있어야 할 상태(변수)들을 정의하는 곳입니다.
  data() {
    return {
      LeftNavMainArr: LeftMenu, 
      isFixed: false,       // 처음에는 스크롤을 안 내렸으니 false (고정 안 됨)
      activeMenuId: null,   // 처음에는 열려있는 아코디언 메뉴가 없으니 null (비어있음)
    };
  },

  // 컴포넌트가 화면에 "처음 등장(Mount)"할 때 딱 한 번 실행되는 곳입니다.
  mounted() {
    // 윈도우(브라우저 창) 전체에 스크롤 감시 카메라(이벤트 리스너)를 달아줍니다.
    // 스크롤이 움직일 때마다 'handleScroll' 함수를 실행하라고 지시합니다.
    window.addEventListener('scroll', this.handleScroll);
  },

  // 컴포넌트가 화면에서 "사라지기 직전(Destroy)"에 실행되는 곳입니다. (다른 페이지로 갈 때 등)
  beforeDestroy() {
    // 달아두었던 스크롤 감시 카메라를 떼어냅니다. 
    // 이걸 안 해주면 다른 페이지에 가서도 계속 감시를 하느라 컴퓨터가 힘들어해요! (메모리 누수 방지)
    window.removeEventListener('scroll', this.handleScroll);
  },

  // 우리가 사용할 기능(함수)들을 모아두는 곳입니다.
  methods: {
    // 1. 스크롤 위치 계산 함수
    handleScroll() {
      // window.scrollY는 현재 화면 맨 위에서부터 얼마나 스크롤을 내렸는지 픽셀 단위로 알려줍니다.
      // 130을 넘으면 this.isFixed가 true가 되고, 다시 위로 올려서 130보다 작아지면 false가 됩니다.
      this.isFixed = window.scrollY > 130;
    },
    
    // 2. 아코디언 메뉴 작동 함수
    toggleMenu(id) {
      // 방금 누른 메뉴(id)가 이미 열려있는 메뉴(this.activeMenuId)와 같다면?
      if (this.activeMenuId === id) {
        // 이미 열린 걸 또 눌렀으니 닫아줘야겠죠? 기억하고 있던 id를 지워버립니다(null).
        this.activeMenuId = null; 
      } else {
        // 다른 메뉴를 눌렀거나, 다 닫혀있을 때 눌렀다면?
        // 새로 누른 메뉴의 id를 기억해둡니다. (HTML에서 이 값을 보고 'is-open' 클래스를 붙여서 열어줍니다)
        this.activeMenuId = id;
      }
    }
  }
}
</script>