<template>
    <div class="page-component__all">
        
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">프로젝트</p>
                <h2 class="page-component__main-tit">{{ isEditMode ? '프로젝트 수정' : '프로젝트 등록' }}</h2>
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
                    <label>프로젝트 제목</label>
                    <input type="text" v-model="formData.title" placeholder="프로젝트 제목을 입력하세요">
                </div>
                <hr/>
                <div class="form-group">
                    <label>썸네일 이미지 등록</label>
                    <input type="file" accept="image/*" @change="handleImageUpload">
                </div>
                <hr/>
                <div class="form-group">
                    <label>태그 (해시태그)</label>
                    <input 
                        type="text" 
                        v-model="newLabel" 
                        @keyup.enter="addLabel" 
                        placeholder="태그 입력 후 엔터를 치세요"
                    >
                    <div class="tag-list">
                        <span class="tag-item" v-for="(tag, index) in formData.labels" :key="index">
                            {{ tag }}
                            <button class="btn-tag-delete" @click="removeLabel(index)">✕</button>
                        </span>
                    </div>
                </div>
                <hr/>
                <div class="form-group">
                    <label>링크 등록</label>
                    <div class="link-box">
                        <span>프로젝트 게시판 링크: </span>
                        <input type="text" v-model="formData.MegaProjectLink" placeholder="예: http://...">
                    </div>
                    <div class="link-box">
                        <span>PC 화면 링크: </span>
                        <input type="text" v-model="formData.PcLink" placeholder="예: http://...">
                    </div>
                    <div class="link-box">
                        <span>MOBILE 화면 링크: </span>
                        <input type="text" v-model="formData.MoLink" placeholder="예: http://...">
                    </div>
                </div>
                <hr/>
                <button class="page-component-btn page-component-btn__add" @click="savePost">저장하기</button>
            </div>

            <!-- 💡 프로젝트 카드 전용 실시간 미리보기 -->
            <div class="preview-area" style="background-color: #f8f9fa;">
                <h2>실시간 미리보기</h2>
                <div style="width: 300px; margin-top: 20px;">
                    <ProjectCard :item="formData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// ✨ 프로젝트 카드를 미리보기로 사용합니다.
import ProjectCard from '@/components/ProjectCard.vue'; 
import "../../css/pages/component/common.css";
import "../../css/pages/posting/posting.css";

export default {
    components: {
        ProjectCard
    },
    data() {
        return {
            isPopupOn: false, 
            newLabel: '',
            formData: {
                title: '',
                labels: ['신규런칭'], 
                MegaProjectLink: '', 
                PcLink: '', 
                MoLink: '', 
                imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Preview',
                date: new Date().toISOString().split('T')[0] // 미리보기를 위해 오늘 날짜 세팅
            },
        };
    },
    computed: {
        isEditMode() {
            return !!this.$route.query.id;
        }
    },
    mounted() {
        if (this.isEditMode) {
            this.loadPostData(this.$route.query.id);
        }
    },
    methods: {
        fncGoBack() {
            this.$router.go(-1);
        },
        loadPostData(id) {
            const allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            const targetPost = allPosts.find(post => post.id === Number(id));
            if (targetPost) {
                this.formData = { ...targetPost };
            } else {
                alert('해당 게시물을 찾을 수 없습니다.');
                this.$router.go(-1);
            }
        },
        savePost() {
            // 프로젝트는 기본 카테고리가 project로 빠집니다.
            const category = this.$route.query.category || 'megateacher';
            const editId = this.$route.query.id;
            let existingPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];

            if (this.isEditMode) {
                const index = existingPosts.findIndex(post => post.id === Number(editId));
                if (index !== -1) {
                    existingPosts[index] = {
                        ...this.formData,
                        id: Number(editId), 
                        category: category, 
                        date: existingPosts[index].date 
                    };
                    alert('프로젝트가 성공적으로 수정되었습니다!');
                }
            } else {
                const newPost = {
                    ...this.formData,
                    id: Date.now(),
                    category: category,
                    date: new Date().toISOString().split('T')[0]
                };
                existingPosts.unshift(newPost);
                alert('프로젝트가 성공적으로 등록되었습니다!');
            }

            localStorage.setItem('megaDbPosts', JSON.stringify(existingPosts));
            // 💡 저장 후 프로젝트 카테고리 페이지로 이동합니다.
            this.$router.push(`/project/${category}`);
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