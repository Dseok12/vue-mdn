<template>
  <div class="left-nav">
    <div class="left-nav__main-wrap">
      <ul class="left-nav__main-box">
        <li
          class="left-nav__item"
          v-for="parentMenu in LeftNavMainArr"
          :key="parentMenu.id"
        >
          <a
            :href="parentMenu.path"
            class="left-nav__link"
            :class="{ 'left-nav__link--active': isParentActive(parentMenu.path) }"
            @click.prevent="toggleMenu(parentMenu.id)"
          >
            {{ parentMenu.title }}
          </a>

          <div
            class="left-nav__sub-wrap"
            :class="{ 'is-open': activeMenuId === parentMenu.id }"
            v-if="parentMenu.children && parentMenu.children.length > 0"
          >
            <div class="left-nav__sub-box">
              <ul class="left-nav__sub-inner">
                <li
                  class="left-nav__sub-item"
                  v-for="childMenu in parentMenu.children"
                  :key="childMenu.id"
                >
                  <router-link
                    :to="childMenu.path"
                    class="left-nav__sub-link"
                    active-class="left-nav__sub-link--active"
                  >
                    {{ childMenu.title }}
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
    isParentActive(menuPath) {
      if (!this.$route || !this.$route.path) return false;
      return this.$route.path.startsWith(menuPath);
    },
    syncMenuWithRoute() {
      if (!this.$route || !this.$route.path) return;
      const currentMenu = this.LeftNavMainArr.find(menu => this.$route.path.startsWith(menu.path));
      if (currentMenu) {
        this.activeMenuId = currentMenu.id;
      }
    },
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
