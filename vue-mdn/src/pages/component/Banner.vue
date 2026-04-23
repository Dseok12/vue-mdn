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
                    v-for="post in bannerPosts" 
                    :key="post.id" 
                    :item="post" 
                    @delete="handleDelete"
                />

                <div v-if="bannerPosts.length === 0" style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;">
                    등록된 배너 게시물이 없습니다. <br/>우측 상단의 '게시글 등록' 버튼을 눌러 첫 게시물을 작성해 보세요!
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import '../../css/pages/component/common.css';
import '../../css/pages/component/banner.css';
// 💡 아까 만든 리스트 아이템 컴포넌트를 불러옵니다!
import PageComponentListItem from '../../components/PageComponentListItem.vue';

export default {
    components: {
        PageComponentListItem
    },
    data() {
        return {
            // 이 배열에 배너용 데이터만 담깁니다.
            bannerPosts: [] 
        };
    },
    // 화면이 켜지자마자 로컬 스토리지에서 데이터를 읽어오는 함수를 실행합니다.
    mounted() {
        this.loadPosts();
    },
    methods : {
        loadPosts() {
            // 1. 창고에서 전체 데이터를 꺼내옵니다.
            const allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            
            // 2. 그 중에서 category가 'banner'인 녀석들만 남겨서(filter) 내 배열에 넣습니다.
            // 데이터가 내 배열에 들어오는 순간, Vue가 알아서 화면에 카드들을 그려냅니다!
            this.bannerPosts = allPosts.filter(post => post.category === 'banner');
        },
        
        // 💡 자식 컴포넌트에서 '삭제' 버튼을 눌렀을 때 실행되는 함수
        handleDelete(deleteId) {
            let allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            
            // 삭제하려는 ID와 다른 것들만 살려서 다시 저장합니다. (즉, 해당 ID만 삭제됨)
            allPosts = allPosts.filter(post => post.id !== deleteId);
            localStorage.setItem('megaDbPosts', JSON.stringify(allPosts));
            
            alert('삭제되었습니다.');
            this.loadPosts(); // 목록을 다시 불러와 화면을 최신화합니다.
        }
    }
}
</script>