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
                    <label>배너 이미지 등록</label>
                    <input type="file" accept="image/*" @change="handleImageUpload">
                </div>

                <div class="form-group">
                    <label>노출 디바이스 (다중 선택)</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="PC" v-model="formData.deviceType"> PC</label>
                        <label><input type="checkbox" value="MO" v-model="formData.deviceType"> Mobile</label>
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
                    <input type="text" v-model="formData.manager" placeholder="예: XXX 대리">
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
                imgUrl: 'https://placehold.co/600x800' 
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
        },
        // ✨ 2. 이미지 업로드 처리 함수 추가
        handleImageUpload(event) {
            // 사용자가 선택한 파일 배열 중 첫 번째 파일을 가져옵니다.
            const file = event.target.files[0]; 
            
            if (file) {
                // FileReader 객체를 생성하여 파일을 비동기적으로 읽습니다.
                const reader = new FileReader();
                
                // 파일 읽기가 완료되면 실행되는 콜백 함수입니다.
                reader.onload = (e) => {
                    // 읽어낸 Base64 형태의 이미지 문자열을 imgUrl 데이터에 덮어씌웁니다.
                    // 데이터가 바뀌었으므로 오른쪽 미리보기 화면이 즉시 업데이트됩니다!
                    this.formData.imgUrl = e.target.result;
                };
                
                // 파일을 Data URL 형식으로 읽어들이라고 명령합니다.
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>