<template>
    <div>
        <div class="page-project__top-wrap">
            <div class="page-project__title-wrap">
                <p class="page-project__sub-tit">프로젝트</p>
                <h2 class="page-project__main-tit">{{ title }}</h2>
            </div>
            <div class="page-project-btn-wrap">
                <router-link :to="`/posting/projectpost?category=${category}`" class="page-project__add-post__btn">
                    게시글 등록
                </router-link>
            </div>
        </div>

        <div class="page-project-contents">
            <div class="page-project-contents__box">
                <div class="thumbnail-container" v-if="currentPosts.length > 0">
                    <ProjectCard
                        v-for="project in pagedPosts"
                        :key="project.id"
                        :item="project"
                    />
                </div>

                <div
                    v-else
                    style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;"
                >
                    등록된 프로젝트 게시글이 없습니다.<br>
                    우측 상단의 '게시글 등록' 버튼을 눌러 첫 게시글을 작성해 보세요.
                </div>

                <div class="pagination" v-if="totalPages > 1">
                    <button
                        :disabled="currentPage === 1"
                        @click="movePage(currentPage - 1)"
                    >
                        이전
                    </button>

                    <button
                        v-for="pageNumber in totalPages"
                        :key="pageNumber"
                        :class="{ active: currentPage === pageNumber }"
                        @click="movePage(pageNumber)"
                    >
                        {{ pageNumber }}
                    </button>

                    <button
                        :disabled="currentPage === totalPages"
                        @click="movePage(currentPage + 1)"
                    >
                        다음
                    </button>
                </div>

                <div class="page-info" v-if="currentPosts.length > 0">
                    전체 {{ currentPosts.length }}개 중 {{ startIndex + 1 }}-{{ endIndex }}개 표시 중
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../css/pages/project/common.css';
import ProjectCard from './ProjectCard.vue';
import postManager from '@utils/postManager.js';

export default {
    name: 'ProjectListPage',
    components: {
        ProjectCard
    },
    props: {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            currentPage: 1,
            perPage: 8,
            currentPosts: []
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.currentPosts.length / this.perPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.perPage;
        },
        endIndex() {
            const end = this.startIndex + this.perPage;
            return end > this.currentPosts.length ? this.currentPosts.length : end;
        },
        pagedPosts() {
            return this.currentPosts.slice(this.startIndex, this.endIndex);
        }
    },
    mounted() {
        this.loadPosts();
    },
    watch: {
        category() {
            this.currentPage = 1;
            this.loadPosts();
        }
    },
    methods: {
        loadPosts() {
            this.currentPosts = postManager.getPostsByCategory(this.category, 'project');
        },
        movePage(pageNumber) {
            if (pageNumber < 1 || pageNumber > this.totalPages) return;

            this.currentPage = pageNumber;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
</script>
