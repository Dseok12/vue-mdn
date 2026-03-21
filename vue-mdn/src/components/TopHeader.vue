<template>
  <div class="top-header__wrap">
    <div class="top-header__inner">
      <h1 class="top-header__logo">
        <img src="@/assets/img/logo.jpg" alt="Vue MDN Logo">
      </h1>
      
      <nav class="top-header__nav">
        <ul class="top-header__nav-list">
          <li class="top-header__nav-item">
            <router-link to="/intro" class="top-header__nav-link" active-class="top-header__nav-link--active">소개</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/style-guide" class="top-header__nav-link" active-class="top-header__nav-link--active">스타일가이드</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/components" class="top-header__nav-link" active-class="top-header__nav-link--active">컴포넌트</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/projects" class="top-header__nav-link" active-class="top-header__nav-link--active">프로젝트</router-link>
          </li>
        </ul>
      </nav>
      
    </div>
  </div>
</template>

<script>
import '../css/components/TopHeader.css';

export default {
  name: 'TopHeader',
  data() {
    return {
      
    }
  }
}
</script>