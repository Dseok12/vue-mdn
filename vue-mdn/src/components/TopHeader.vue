<template>
  <div class="top-header__wrap">
    <div class="top-header__inner">
      <h1 class="top-header__logo">
        <router-link to="/"><img src="@/assets/img/logo.jpg" alt="Vue MDN Logo"></router-link>
      </h1>
      
      <nav class="top-header__nav">
        <ul class="top-header__nav-list">
          <li class="top-header__nav-item">
            <router-link to="/intro/summary" class="top-header__nav-link" active-class="top-header__nav-link--active">소개</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/style-guide/logo" class="top-header__nav-link" active-class="top-header__nav-link--active">스타일가이드</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/component/banner" class="top-header__nav-link" active-class="top-header__nav-link--active">컴포넌트</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/project/mega-teacher" class="top-header__nav-link" active-class="top-header__nav-link--active">프로젝트</router-link>
          </li>
          <li class="top-header__nav-item">
            <router-link to="/admin" class="top-header__nav-link" active-class="top-header__nav-link--active">관리자</router-link>
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