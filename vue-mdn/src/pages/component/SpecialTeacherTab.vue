<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">기획전 선생님 탭메뉴</h2>
            </div>
            <div class="page-component-btn-wrap">
                <router-link to="../posting/post?category=specialteachertab" class="page-component__add-post__btn" >게시글 등록</router-link>
            </div>
        </div>
        <div class="page-component-list__wrap">
            <div class="page-component-list__box">

                <PageComponentListItem
                    v-for="게시물 in 선생님기획전탭_게시물_목록"
                    :key="게시물.id"
                    :item="게시물"
                    @delete="게시물_삭제하기"
                    @edit="게시물_수정하기"
                />

                <div v-if="선생님기획전탭_게시물_목록.length === 0" style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;">
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

export default {
    // 수입해 온 부품을 내 화면에서 쓰겠다고 등록합니다.
    components: {
        PageComponentListItem
    },
    data() {
        return {
            // 초기값 null은 아무것도 열리지 않은 상태입니다.
            activeCodeSlideId: null,
            선생님기획전탭_게시물_목록: []
        };
    },
    // 화면이 브라우저에 켜지자마자 이 안에 있는 함수를 실행합니다.
    mounted() {
        this.게시물_불러오기();
    },
    methods : {

        // ✨ 창고(로컬 스토리지)에서 내 카테고리에 맞는 글만 가져오는 함수
        게시물_불러오기() {
            // 1. 창고에 있는 '전체_게시물'을 싹 다 가져옵니다.
            const 전체_게시물 = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            
            // 2. 그 중에서 카테고리가 'board'인 것만 체에 걸러서(filter) 내 상자에 담습니다.
            // 💡 연습 포인트 4: 다른 파일 연습할 때는 'board' 부분을 그 파일에 맞게(예: 'popup') 바꿔야 합니다!
            this.선생님기획전탭_게시물_목록 = 전체_게시물.filter(게시물 => 게시물.category === 'specialteachertab');
        },

        // ✨ 부품(자식)에서 삭제 버튼이 눌렸을 때 실행되는 함수
        게시물_삭제하기(삭제할_아이디) {
            // 1. 창고 전체 데이터를 가져옵니다.
            let 전체_게시물 = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            
            // 2. 삭제할 아이디와 "다른" 데이터들만 살려두고 새 배열을 만듭니다. (즉, 삭제 효과)
            전체_게시물 = 전체_게시물.filter(게시물 => 게시물.id !== 삭제할_아이디);
            
            // 3. 살아남은 애들을 다시 창고에 예쁘게 포장해서 넣어둡니다.
            localStorage.setItem('megaDbPosts', JSON.stringify(전체_게시물));
            
            alert('삭제되었습니다.');
            
            // 4. 화면을 방금 지운 최신 상태로 새로고침(업데이트) 합니다.
            this.게시물_불러오기(); 
        },

        // ✨ 부품(자식)에서 수정 버튼이 눌렸을 때 실행되는 함수 (다음 진도를 위한 맛보기)
        게시물_수정하기(수정할_데이터) {
            console.log("수정할 데이터:", 수정할_데이터);
            // 나중에 에디터 화면으로 넘어가는 기능을 만들 때 쓸 겁니다!
            alert('게시글 수정 화면으로 이동하는 기능은 다음 단계에서 구현합니다!');
        },

        toggleCodeSlide(id) {
            // 1. 이미 열려있는 항목을 다시 누르면 닫습니다. (null 처리)
            // 2. 다른 항목을 누르면 해당 항목의 ID로 교체합니다. (그 항목만 열림)
            if (this.activeCodeSlideId === id) {
                this.activeCodeSlideId = null;
            } else {
                this.activeCodeSlideId = id;
            }
        }
    }
}
</script>