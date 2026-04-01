<template>
  <div class="left-nav">
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
  methods: {
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