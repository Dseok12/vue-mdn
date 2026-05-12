<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">배너</h2>
            </div>
            <div class="page-component-btn-wrap">
                <router-link to="/posting/post?category=banner" class="page-component__add-post__btn">게시글 등록</router-link>
            </div>
        </div>

        <div class="page-component-list__wrap">
            <div class="page-component-list__box">
                
                <PageComponentListItem 
                    v-for="post in currentPosts" 
                    :key="post.id" 
                    :item="post" 
                    @delete="handleDelete"
                    @edit="handleEdit"
                />

                <div v-if="currentPosts.length === 0" style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;">
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
            // 변수 이름도 헷갈리지 않게 하나로 통일합니다.
            currentPosts: [] 
        };
    },
    mounted() {
        this.loadPosts();
    },
    methods : {
        // 1. 데이터 불러오기 (공통 두뇌 사용)
        loadPosts() {
            // 💡 카테고리 이름('banner', 'board' 등)만 던져주면 알아서 찾아옵니다!
            this.currentPosts = postManager.getPostsByCategory('banner');
        },
        
        // 2. 데이터 삭제하기 (공통 두뇌 사용)
        handleDelete(deleteId) {
            postManager.deletePostById(deleteId); // 공통 두뇌가 대신 삭제해줌
            alert('삭제되었습니다.');
            this.loadPosts(); // 삭제 후 최신 목록으로 리셋
        },
        
        // 3. 데이터 수정하기 (모든 페이지 공통 로직)
        handleEdit(postData) {
            this.$router.push(`/posting/post?category=${postData.category}&id=${postData.id}`);
        }
    }
}
</script>