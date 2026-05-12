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