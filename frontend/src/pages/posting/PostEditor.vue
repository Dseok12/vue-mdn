<template>
    <div class="page-component__all">
        
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">{{ isEditMode ? '게시글 수정' : '게시글 등록' }}</h2>
            </div>
            <div class="page-component-btn-wrap">
                <button class="page-component-btn page-component-btn__add" @click="savePost">{{ isEditMode ? '수정' : '등록' }}</button>
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
                <hr/>
                <div class="form-group">
                    <label>배너 이미지 등록</label>
                    <input type="file" accept="image/*" @change="handleImageUpload">
                </div>
                <hr/>
                <div class="form-group">
                    <label>노출 디바이스 (다중 선택)</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="PC" v-model="formData.deviceType"> PC</label>
                        <label><input type="checkbox" value="MO" v-model="formData.deviceType"> Mobile</label>
                    </div>
                </div>
                <hr/>
                <div class="form-group">
                    <label>라벨 (해시태그)</label>
                    <input 
                        type="text" 
                        v-model="newLabel" 
                        @keyup.enter="addLabel" 
                        placeholder="태그 입력 후 엔터를 치세요"
                    >
                    <div class="tag-list">
                        <span class="tag-item" v-for="(label, index) in formData.tags" :key="index">
                            {{ label }}
                            <button class="btn-tag-delete" @click="removeLabel(index)">✕</button>
                        </span>
                    </div>
                </div>
                <hr/>
                <div class="form-group">
                    <label>링크</label>
                    <div class="link-box">
                        <span>프로젝트게시판: </span>
                        <input 
                            type="text" 
                            v-model="formData.links.board" 
                            placeholder="해당 프로젝트 게시판 링크를 입력하세요."
                        >
                    </div>
                    <div class="link-box">
                        <span>PC 링크: </span>
                        <input 
                            type="text" 
                            v-model="formData.links.pc" 
                            placeholder="백업된 next 링크를 입력하세요."
                        >
                    </div>
                    <div class="link-box">
                        <span>MOBILE 링크: </span>
                        <input 
                            type="text" 
                            v-model="formData.links.mo" 
                            placeholder="백업된 next 링크를 입력하세요."
                        >
                    </div>
                </div>
                <hr/>
                <div class="form-group">
                    <label>담당자</label>
                    <input type="text" v-model="formData.manager" placeholder="예: XXX 대리">
                </div>
                <hr/>
                <div class="form-group">
                    <label>CSS 코드</label>
                    <textarea v-model="formData.cssCode" rows="5" placeholder="CSS 코드를 입력하세요"></textarea>
                </div>
                <hr/>
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
import PostPreview from './PostPreView.vue'; 
import postManager, { normalizePost } from '@/utils/postManager.js';
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
                type: 'component',
                title: '',
                manager: '',
                cssCode: '',
                deviceType: ['PC', 'MO'], 
                tags: ['배너', '이벤트'],
                links: {
                    board: '',
                    pc: '',
                    mo: '',
                },
                imgUrl: 'https://placehold.co/600x800' 
            },
        };
    },
    computed: {
        // 💡 주소창에 id 값이 있으면 true(수정 모드), 없으면 false(등록 모드)
        isEditMode() {
            return !!this.$route.query.id;
        }
    },
    mounted() {
        // 💡 화면이 켜질 때, 수정 모드라면 기존 데이터를 불러옵니다.
        if (this.isEditMode) {
            this.loadPostData(this.$route.query.id);
        }
    },
    methods: {
        fncGoBack() {
            this.$router.go(-1);
        },
        // 💡 수정할 게시물의 데이터를 불러와서 폼에 채워주는 함수
        loadPostData(id) {
            const allPosts = postManager.getAllPosts();
            // 넘어온 ID는 문자열일 수 있으므로 Number()로 숫자로 변환해서 비교합니다.
            const targetPost = allPosts.find(post => post.id === Number(id));
            
            if (targetPost) {
                // 기존 데이터로 폼을 덮어씌웁니다.
                this.formData = normalizePost({ ...targetPost, type: 'component' });
            } else {
                alert('해당 게시물을 찾을 수 없습니다.');
                this.$router.go(-1);
            }
        },
        savePost() {
            const category = this.$route.query.category || 'common';
            const editId = this.$route.query.id;
            const now = new Date().toISOString().split('T')[0];

            if (this.isEditMode) {
                postManager.savePost({
                    ...this.formData,
                    id: Number(editId),
                    type: 'component',
                    category,
                    updatedAt: now,
                });
                alert('게시글이 성공적으로 수정되었습니다!');
            } else {
                postManager.savePost({
                    ...this.formData,
                    id: Date.now(),
                    type: 'component',
                    category,
                    createdAt: now,
                    updatedAt: now,
                    date: now,
                });
                alert('게시글이 성공적으로 등록되었습니다!');
            }

            // 창고에 최종 저장 후 리스트 페이지로 이동
            this.$router.push(`/component/${category}`);
        },
        addLabel() {
            const trimmedLabel = this.newLabel.trim(); 
            if (trimmedLabel && !this.formData.tags.includes(trimmedLabel)) {
                this.formData.tags.push(trimmedLabel);
            }
            this.newLabel = ''; 
        },
        removeLabel(index) {
            this.formData.tags.splice(index, 1);
        },
        handleImageUpload(event) {
            const file = event.target.files[0]; 
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.formData.imgUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>
