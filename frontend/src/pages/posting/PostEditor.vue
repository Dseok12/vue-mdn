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
                        <span class="tag-item" v-for="(label, index) in formData.labels" :key="index">
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
                            v-model="formData.MegaProjectLink" 
                            placeholder="해당 프로젝트 게시판 링크를 입력하세요."
                        >
                    </div>
                    <div class="link-box">
                        <span>PC 링크: </span>
                        <input 
                            type="text" 
                            v-model="formData.PcLink" 
                            placeholder="백업된 next 링크를 입력하세요."
                        >
                    </div>
                    <div class="link-box">
                        <span>MOBILE 링크: </span>
                        <input 
                            type="text" 
                            v-model="formData.MoLink" 
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
                MegaProjectLink: '', 
                PcLink: '', 
                MoLink: '', 
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
            const allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
            // 넘어온 ID는 문자열일 수 있으므로 Number()로 숫자로 변환해서 비교합니다.
            const targetPost = allPosts.find(post => post.id === Number(id));
            
            if (targetPost) {
                // 기존 데이터로 폼을 덮어씌웁니다.
                this.formData = { ...targetPost };
            } else {
                alert('해당 게시물을 찾을 수 없습니다.');
                this.$router.go(-1);
            }
        },
        savePost() {
            const category = this.$route.query.category || 'common';
            const editId = this.$route.query.id;
            let existingPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];

            if (this.isEditMode) {
                // 💡 [수정 모드] 기존 배열에서 지금 수정 중인 글의 위치(인덱스)를 찾습니다.
                const index = existingPosts.findIndex(post => post.id === Number(editId));
                if (index !== -1) {
                    existingPosts[index] = {
                        ...this.formData,
                        id: Number(editId), // 기존 ID는 유지
                        category: category, 
                        date: existingPosts[index].date // 최초 작성일 유지
                    };
                    alert('게시글이 성공적으로 수정되었습니다!');
                }
            } else {
                // 💡 [등록 모드] 기존에 작성하신 새 글 등록 로직
                const newPost = {
                    ...this.formData,
                    id: Date.now(),
                    category: category,
                    date: new Date().toISOString().split('T')[0]
                };
                existingPosts.unshift(newPost);
                alert('게시글이 성공적으로 등록되었습니다!');
            }

            // 창고에 최종 저장 후 리스트 페이지로 이동
            localStorage.setItem('megaDbPosts', JSON.stringify(existingPosts));
            this.$router.push(`/component/${category}`);
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