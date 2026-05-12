<template>
  <div class="left-nav">
    <div class="left-nav__main-wrap">
      <ul class="left-nav__main-box">
        
        <li
          class="left-nav__item"
          v-for="원뎁스메뉴 in LeftNavMainArr" 
          :key="원뎁스메뉴.id"
        >
          <a
            :href="원뎁스메뉴.path"
            class="left-nav__link"
            :class="{ 'left-nav__link--active': isParentActive(원뎁스메뉴.path) }"
            @click.prevent="toggleMenu(원뎁스메뉴.id)"
          >
            {{ 원뎁스메뉴.title }}
          </a>

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
import '@css/components/LeftNav.css';
import LeftMenu from '../data/LeftMenu.js';

export default {
  name: 'LeftNav',
  data() {
    return {
      LeftNavMainArr: LeftMenu, 
      activeMenuId: null,   
    };
  },
  mounted() {
    this.syncMenuWithRoute();
  },
  watch: {
    $route() {
      this.syncMenuWithRoute();
    }
  },
  methods: {
    // 💡 핵심 해결: 템플릿 안에서 직접 비교하지 않고 함수로 빼서 Vue 엔진이 반응성을 잃지 않도록 강제함
    isParentActive(menuPath) {
      if (!this.$route || !this.$route.path) return false;
      return this.$route.path.startsWith(menuPath);
    },
    // 새로고침을 하거나 뒤로 가기를 했을 때 현재 주소에 맞는 메뉴를 자동으로 펴줌
    syncMenuWithRoute() {
      if (!this.$route || !this.$route.path) return;
      const currentMenu = this.LeftNavMainArr.find(menu => this.$route.path.startsWith(menu.path));
      if (currentMenu) {
        this.activeMenuId = currentMenu.id;
      }
    },
    // 메뉴 이름 클릭 시 부드럽게 열고 닫는 스위치 역할
    toggleMenu(id) {
      if (this.activeMenuId === id) {
        this.activeMenuId = null; 
      } else {
        this.activeMenuId = id;
      }
    }
  }
}
</script>