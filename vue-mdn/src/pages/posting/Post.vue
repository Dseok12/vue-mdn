<template>
    <div class="page-component__all">
    <div class="page-component__top-wrap">
        <div class="page-component__title-wrap">
            <p class="page-component__sub-tit">컴포넌트</p>
            <h2 class="page-component__main-tit">게시글 등록</h2>
        </div>
        <div class="page-component-btn-wrap">
            <button class="page-component-btn page-component-btn__add" >등록</button>
            <button class="page-component-btn page-component-btn__cancel" @click="fncGoBackPopUp" >취소</button>
        </div>
    </div>
    <div class="go-back__popup on">
        <p>내용은 저장 되지 않습니다. 취소하시겠습니까?</p>
        <button class="page-component-btn page-component-btn__cancel-ok">확인</button>
        <button class="page-component-btn page-component-btn__cancel-no">취소</button>
    </div>
    <div class="page-component-list__wrap">
        <div class="page-component-list__box">
            게시물 목록
        </div>
    </div>
    </div>
</template>

<script>
import '../../css/pages/component/common.css';

export default {
    data() {
        return {

        };
    },
    components : {
        
    },
    methods : {
        fncGoBackPopUpOk(){
            this.$router.go(-1);
            return;
        
            const cancelBtn = document.querySelector('.page-component-btn__cancel');
        },
        fncGoBack(){
            this.$router.go(-1);
            return;
        }
    }
}
</script>