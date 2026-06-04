<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">{{ isEditMode ? '게시물 수정' : '게시물 등록' }}</h2>
            </div>
            <div class="page-component-btn-wrap">
                <button class="page-component-btn page-component-btn__add" @click="savePost">
                    {{ isEditMode ? '수정' : '등록' }}
                </button>
                <button class="page-component-btn page-component-btn__cancel" @click="isPopupOn = true">취소</button>
            </div>
        </div>

        <div class="go-back__popup-wrap" v-if="isPopupOn">
            <div class="go-back__popup">
                <p>내용은 저장되지 않습니다.<br>취소하시겠습니까?</p>
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
                <hr>
                <div class="form-group">
                    <label>이미지 등록</label>
                    <input type="file" accept="image/*" @change="handleImageUpload">
                </div>
                <hr>
                <div class="form-group">
                    <label>노출 디바이스 (다중 선택)</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="PC" v-model="formData.deviceType"> PC</label>
                        <label><input type="checkbox" value="MO" v-model="formData.deviceType"> Mobile</label>
                    </div>
                </div>
                <hr>
                <div class="form-group">
                    <label>라벨 (해시태그)</label>
                    <input
                        type="text"
                        v-model="newLabel"
                        @keyup.enter="addLabel"
                        placeholder="태그 입력 후 엔터를 누르세요"
                    >
                    <div class="tag-list">
                        <span class="tag-item" v-for="(label, index) in formData.tags" :key="index">
                            {{ label }}
                            <button class="btn-tag-delete" @click="removeLabel(index)">삭제</button>
                        </span>
                    </div>
                </div>
                <hr>
                <div class="form-group">
                    <label>링크</label>
                    <div class="link-box">
                        <span>프로젝트 게시판: </span>
                        <input
                            type="text"
                            v-model="formData.links.board"
                            placeholder="프로젝트 게시판 링크를 입력하세요"
                        >
                    </div>
                    <div class="link-box">
                        <span>PC 링크: </span>
                        <input
                            type="text"
                            v-model="formData.links.pc"
                            placeholder="PC 링크를 입력하세요"
                        >
                    </div>
                    <div class="link-box">
                        <span>MOBILE 링크: </span>
                        <input
                            type="text"
                            v-model="formData.links.mo"
                            placeholder="Mobile 링크를 입력하세요"
                        >
                    </div>
                </div>
                <hr>
                <div class="form-group">
                    <label>담당자</label>
                    <input type="text" v-model="formData.manager" placeholder="예: 홍길동 매니저">
                </div>
                <hr>
                <div class="form-group">
                    <label>CSS 코드</label>
                    <textarea v-model="formData.cssCode" rows="5" placeholder="CSS 코드를 입력하세요"></textarea>
                </div>
                <hr>
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
            const allPosts = postManager.getAllPosts();
            const targetPost = allPosts.find(post => post.id === Number(id));

            if (targetPost) {
                this.formData = normalizePost({ ...targetPost, type: 'component' });
            } else {
                alert('해당 게시물을 찾을 수 없습니다.');
                this.$router.go(-1);
            }
        },
        savePost() {
            if (!this.validateForm()) return;

            const category = this.$route.query.category || 'common';
            const editId = this.$route.query.id;
            const now = new Date().toISOString().split('T')[0];
            const postPayload = {
                ...this.formData,
                type: 'component',
                category,
                deviceTypes: this.formData.deviceType,
                thumbnailUrl: this.formData.imgUrl,
                updatedAt: now,
                status: this.formData.status || 'published',
            };

            if (this.isEditMode) {
                postManager.savePost({
                    ...postPayload,
                    id: Number(editId),
                });
                alert('게시물이 성공적으로 수정되었습니다.');
            } else {
                postManager.savePost({
                    ...postPayload,
                    id: Date.now(),
                    createdAt: now,
                    date: now,
                });
                alert('게시물이 성공적으로 등록되었습니다.');
            }

            this.$router.push(`/component/${category}`);
        },
        validateForm() {
            if (!this.formData.title.trim()) {
                alert('제목을 입력해주세요.');
                return false;
            }

            if (!this.formData.deviceType.length) {
                alert('노출 디바이스를 하나 이상 선택해주세요.');
                return false;
            }

            if (!this.isValidUrl(this.formData.links.board)
                || !this.isValidUrl(this.formData.links.pc)
                || !this.isValidUrl(this.formData.links.mo)) {
                alert('링크는 http:// 또는 https://로 시작하는 주소만 입력해주세요.');
                return false;
            }

            return true;
        },
        isValidUrl(value) {
            if (!value) return true;
            return /^https?:\/\//.test(value);
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
