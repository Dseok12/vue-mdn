<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">{{ typeLabel }} / {{ categoryTitle }}</p>
                <h2 class="page-component__main-tit">{{ displayPost.title || '제목 없음' }}</h2>
            </div>
            <div class="page-component-btn-wrap">
                <button class="page-component-btn page-component-btn__cancel" @click="goList">목록</button>
                <button class="page-component-btn page-component-btn__cancel-ok" @click="goEdit">수정</button>
                <button class="page-component-btn page-component-btn__cancel-no" @click="deletePost">삭제</button>
            </div>
        </div>

        <div v-if="post" class="post-detail">
            <div class="page-component-list__item">
                <div class="banner-list__item-img">
                    <a :href="displayPost.imgUrl" target="_blank">
                        <img :src="displayPost.imgUrl" :alt="displayPost.title">
                    </a>
                </div>
                <div class="page-component-list__item-txt">
                    <div class="page-component-list__item-label-box">
                        <span class="label label-device__type01" v-for="device in displayPost.deviceType" :key="device">
                            {{ device }}
                        </span>
                        <span class="label label-type01__color01" v-for="tag in displayPost.tags" :key="tag">
                            {{ tag }}
                        </span>
                    </div>
                    <div class="page-component-list__item-manager" v-if="displayPost.manager">
                        <strong>담당자: </strong><span>{{ displayPost.manager }}</span>
                    </div>
                    <div class="thumbnail-date">등록일: {{ displayPost.createdAt || displayPost.date }}</div>
                    <div class="thumbnail-date">수정일: {{ displayPost.updatedAt }}</div>
                    <ul class="page-component-list__item-link">
                        <li>
                            <span>프로젝트 게시판:</span>
                            <a v-if="displayPost.links.board" :href="displayPost.links.board" target="_blank">{{ displayPost.links.board }}</a>
                            <p v-else>링크가 없습니다.</p>
                        </li>
                        <li>
                            <span>PC 링크:</span>
                            <a v-if="displayPost.links.pc" :href="displayPost.links.pc" target="_blank">{{ displayPost.links.pc }}</a>
                            <p v-else>링크가 없습니다.</p>
                        </li>
                        <li>
                            <span>MOBILE 링크:</span>
                            <a v-if="displayPost.links.mo" :href="displayPost.links.mo" target="_blank">{{ displayPost.links.mo }}</a>
                            <p v-else>링크가 없습니다.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="page-component-list__item-code-area" v-if="displayPost.cssCode">
                <a href="javascript:;" @click.prevent="isCodeOpen = !isCodeOpen"><span>Css Code Style</span></a>
                <div class="codeArea__inner" :class="{ 'codeArea-is-open': isCodeOpen }">
                    <div class="codeArea__inner--box">
                        <pre>{{ displayPost.cssCode }}</pre>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-else
            style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;"
        >
            게시물을 찾을 수 없습니다.
        </div>
    </div>
</template>

<script>
import postManager, { normalizePost } from '@utils/postManager.js';
import { getCategoryTitle } from '@/data/categoryMeta.js';
import "../../css/pages/component/common.css";
import "../../css/pages/component/banner.css";

export default {
    name: 'PostDetail',
    data() {
        return {
            post: null,
            isCodeOpen: true,
        };
    },
    computed: {
        type() {
            return this.$route.meta.type || this.$route.params.type || 'component';
        },
        typeLabel() {
            return this.type === 'project' ? '프로젝트' : '컴포넌트';
        },
        category() {
            return this.$route.params.category;
        },
        categoryTitle() {
            return getCategoryTitle(this.type, this.category);
        },
        displayPost() {
            return this.post ? normalizePost(this.post) : {};
        }
    },
    mounted() {
        this.loadPost();
    },
    watch: {
        '$route.params.id'() {
            this.loadPost();
        }
    },
    methods: {
        loadPost() {
            const targetPost = postManager.getPostById(this.$route.params.id);

            if (targetPost && targetPost.type === this.type && targetPost.category === this.category) {
                this.post = targetPost;
            } else {
                this.post = null;
            }
        },
        goList() {
            this.$router.push(`/${this.type}/${this.category}`);
        },
        goEdit() {
            const editorPath = this.type === 'project' ? '/posting/projectpost' : '/posting/post';
            this.$router.push(`${editorPath}?category=${this.category}&id=${this.$route.params.id}`);
        },
        deletePost() {
            if (!confirm('정말 이 게시물을 삭제하시겠습니까?')) return;

            postManager.deletePostById(this.$route.params.id);
            alert('삭제되었습니다.');
            this.goList();
        }
    }
}
</script>
