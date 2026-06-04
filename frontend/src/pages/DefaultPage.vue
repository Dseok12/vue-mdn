<template>
    <div class="page-content">
        <h2 class="page-title">현재 페이지 경로: {{ currentPath }}</h2>
        <p class="page-desc">
            아직 전용 화면이 준비되지 않은 페이지입니다.<br>
            추후 <b>{{ currentPath }}</b> 경로에 맞는 전용 컴포넌트를 만들어 router.js에 연결할 예정입니다.
        </p>
    </div>
</template>

<script>
export default {
    name: 'DefaultPage',
    computed: {
        currentPath() {
            return this.$route.path;
        }
    }
}
</script>

<style scoped>
.page-title {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #333;
}
.page-desc {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
}
</style>
