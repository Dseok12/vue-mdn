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
                <h2>데이터 입력</h2>
                
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
                
                <button class="page-component-btn__add" @click="savePost">저장하기</button>
            </div>

            <div class="preview-area">
                <h2>실시간 미리보기</h2>
                <PostPreview :post="formData" />
            </div>
        </div>
    </div>
</template>

<script>
// 💡 올려주신 폴더 구조에 맞춰 같은 폴더 안의 Post.vue를 불러오도록 경로를 수정했습니다.
import PostPreview from './Post.vue'; 

// CSS 경로도 캡처해주신 구조에 완벽히 일치합니다.
import '../../css/pages/component/common.css';
import '../../css/pages/posting/posting.css';

export default {
    components: {
        PostPreview
    },
    data() {
        return {
            isPopupOn: false, 
            newLabel: '', // 새로 입력 중인 라벨을 임시로 담을 변수
            
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
        // ✨ 라벨 추가 함수 (엔터키 입력 시 실행)
        addLabel() {
            const trimmedLabel = this.newLabel.trim(); 
            // 빈 칸이 아니고 중복되지 않을 때만 배열에 추가합니다.
            if (trimmedLabel && !this.formData.labels.includes(trimmedLabel)) {
                this.formData.labels.push(trimmedLabel);
            }
            this.newLabel = ''; // 입력창 비우기
        },
        // ✨ 라벨 삭제 함수 (X 버튼 클릭 시 실행)
        removeLabel(index) {
            this.formData.labels.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.editor-container {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    align-items: flex-start;
}

.input-area {
    flex: 1;
    padding: 25px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
}

.preview-area {
    flex: 1.5; 
    padding: 25px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px dashed #ccc;
}

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: bold; margin-bottom: 8px; color: #333; }
.form-group input[type="text"], .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; box-sizing: border-box; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #0056b3; box-shadow: 0 0 0 2px rgba(0,86,179,0.1); }

/* 체크박스 스타일 */
.checkbox-group { display: flex; gap: 15px; }
.checkbox-group label { display: inline-flex; align-items: center; font-weight: normal; cursor: pointer; }
.checkbox-group input[type="checkbox"] { margin-right: 5px; }

/* ✨ 해시태그 리스트 스타일 */
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.tag-item { display: inline-flex; align-items: center; background-color: #e2e8f0; color: #334155; padding: 5px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; }
.btn-tag-delete { background: none; border: none; color: #64748b; margin-left: 6px; cursor: pointer; font-size: 12px; padding: 0 2px; }
.btn-tag-delete:hover { color: #ef4444; }
</style>