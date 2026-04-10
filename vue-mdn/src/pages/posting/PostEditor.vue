<template>
    <div class="page-component__all">
        
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">게시글 등록</h2>
            </div>
            <div class="page-component-btn-wrap">
                <button class="page-component-btn page-component-btn__add" @click="savePost">등록</button>
                <button class="page-component-btn page-component-btn__cancel" @click="isPopupOn = true">취소</button>
            </div>
        </div>

        <div class="go-back__popup-wrap" v-if="isPopupOn">
            <div class="go-back__popup">
                <p>내용은 저장 되지 않습니다.<br/>취소하시겠습니까?</p>
                <div class="page-component-btn__box">
                    <button class="page-component-btn page-component-btn__cancel-ok" @click="fncGoBack">확인</button>
                    <button class="page-component-btn page-component-btn__cancel-no" @click="isPopupOn = false">취소</button>
                </div>
            </div>
        </div>

        <div class="editor-container">
            
            <div class="input-area">
                
                <div class="form-group">
                    <label>제목</label>
                    <input type="text" v-model="formData.title" placeholder="제목을 입력하세요">
                </div>

                <div class="form-group">
                    <label>노출 디바이스 (다중 선택)</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="PC" v-model="formData.deviceType"> PC</label>
                        <label><input type="checkbox" value="MO" v-model="formData.deviceType"> Mobile</label>
                        <label><input type="checkbox" value="APP" v-model="formData.deviceType"> APP</label>
                    </div>
                </div>

                <div class="form-group">
                    <label>라벨 (해시태그)</label>
                    <input 
                        type="text" 
                        v-model="newLabel" 
                        @keyup.enter="addLabel" 
                        placeholder="태그 입력 후 엔터를 치세요"
                    >
                    <div class="tag-list">
                        <span class="tag-item" v-for="(label, index) in formData.labels" :key="index">
                            {{ label }}
                            <button class="btn-tag-delete" @click="removeLabel(index)">✕</button>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label>담당자</label>
                    <input type="text" v-model="formData.manager" placeholder="예: 정원석 대리">
                </div>

                <div class="form-group">
                    <label>CSS 코드</label>
                    <textarea v-model="formData.cssCode" rows="5" placeholder="CSS 코드를 입력하세요"></textarea>
                </div>
                
                <button class="page-component-btn page-component-btn__add" @click="savePost">저장하기</button>
            </div>

            <div class="preview-area">
                <h2>실시간 미리보기</h2>
                <PostPreview :post="formData" />
            </div>
        </div>
    </div>
</template>

<script>
// CSS 임포트는 요청하신 대로 생략했습니다.
import PostPreview from './Post.vue'; 
import "../../css/pages/component/common.css";
import "../../css/pages/posting/posting.css";

export default {
    components: {
        PostPreview
    },
    data() {
        return {
            isPopupOn: false, 
            newLabel: '',
            
            formData: {
                title: '',
                manager: '',
                cssCode: '',
                deviceType: ['PC', 'MO'], 
                labels: ['배너', '이벤트'], 
                imgUrl: 'https://via.placeholder.com/600x200.png?text=Preview+Banner+Image' 
            },
        };
    },
    methods: {
        fncGoBack() {
            this.$router.go(-1);
        },
        savePost() {
            console.log('서버로 전송할 완벽한 데이터 세트:', this.formData);
            alert('게시글이 성공적으로 등록되었습니다!');
        },
        addLabel() {
            const trimmedLabel = this.newLabel.trim(); 
            if (trimmedLabel && !this.formData.labels.includes(trimmedLabel)) {
                this.formData.labels.push(trimmedLabel);
            }
            this.newLabel = ''; 
        },
        removeLabel(index) {
            this.formData.labels.splice(index, 1);
        }
    }
}
</script>