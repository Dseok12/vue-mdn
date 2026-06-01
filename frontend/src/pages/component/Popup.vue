<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">팝업</h2>
            </div>
            <div class="page-component-btn-wrap">
                <router-link to="/posting/post?category=popup" class="page-component__add-post__btn" >게시글 등록</router-link>
            </div>
        </div>
        <div class="page-component-list__wrap">
            <div class="page-component-list__box">

                <PageComponentListItem
                    v-for="게시물 in 팝업_게시물_목록"
                    :key="게시물.id"
                    :item="게시물"
                    @delete="게시물_삭제하기"
                    @edit="게시물_수정하기"
                />

                <div v-if="팝업_게시물_목록.length === 0" style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;">
                    등록된 게시물이 없습니다. <br/>우측 상단의 '게시글 등록' 버튼을 눌러 첫 게시물을 작성해 보세요!
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import '../../css/pages/component/common.css';
import '../../css/pages/component/banner.css';

import PageComponentListItem from '../../components/PageComponentListItem.vue';

import postManager from '@utils/postManager.js';

export default {
    components: {
        PageComponentListItem
    },
    data() {
        return {
            팝업_게시물_목록: [] 
        };
    },
    mounted() {
        this.게시물_불러오기();
    },
    methods: {
        // 1. 공통 두뇌로 데이터 불러오기
        게시물_불러오기() {
            // 💡 'board'라는 카테고리 이름만 던져주면 알아서 필터링해서 가져옵니다!
            this.팝업_게시물_목록 = postManager.getPostsByCategory('popup');
        },

        // 2. 공통 두뇌로 데이터 삭제하기
        게시물_삭제하기(삭제할_아이디) {
            postManager.deletePostById(삭제할_아이디); // 지우는 복잡한 과정은 postManager가 대신 합니다.
            alert('삭제되었습니다.');
            this.게시물_불러오기(); // 최신화
        },

        // 3. 수정 모드로 에디터 열기
        게시물_수정하기(수정할_데이터) {
            // 💡 현재 게시물의 카테고리('board')와 고유 ID를 주소창에 달아서 에디터로 보냅니다.
            this.$router.push(`/posting/post?category=${수정할_데이터.category}&id=${수정할_데이터.id}`);
        }
    }
}
</script>
