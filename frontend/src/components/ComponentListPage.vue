<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">{{ title }}</h2>
            </div>
            <div class="page-component-btn-wrap">
                <router-link :to="`/posting/post?category=${category}`" class="page-component__add-post__btn">
                    게시물 등록
                </router-link>
            </div>
        </div>

        <div class="page-component-list__wrap">
            <div class="page-component-list__box">
                <div class="page-component-filter__box" style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <input
                        type="search"
                        v-model.trim="keyword"
                        placeholder="제목, 담당자, 태그 검색"
                        style="width: 100%; max-width: 320px; height: 38px; padding: 0 12px; border: 1px solid #ddd;"
                    >
                    <select
                        v-model="deviceFilter"
                        style="height: 38px; padding: 0 12px; border: 1px solid #ddd;"
                    >
                        <option value="">전체 디바이스</option>
                        <option value="PC">PC</option>
                        <option value="MO">Mobile</option>
                    </select>
                </div>

                <PageComponentListItem
                    v-for="post in filteredPosts"
                    :key="post.id"
                    :item="post"
                    @delete="handleDelete"
                    @edit="handleEdit"
                />

                <div
                    v-if="filteredPosts.length === 0"
                    style="padding: 80px 0; text-align: center; color: #888; font-size: 1.2rem; background: #f8f9fa; border-radius: 10px;"
                >
                    표시할 게시물이 없습니다.<br>
                    우측 상단의 '게시물 등록' 버튼을 눌러 첫 게시물을 작성해보세요.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../css/pages/component/common.css';
import '../css/pages/component/banner.css';
import PageComponentListItem from './PageComponentListItem.vue';
import postManager from '@utils/postManager.js';

export default {
    name: 'ComponentListPage',
    components: {
        PageComponentListItem
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
            currentPosts: [],
            keyword: '',
            deviceFilter: '',
        };
    },
    computed: {
        filteredPosts() {
            const keyword = this.keyword.toLowerCase();

            return this.currentPosts.filter(post => {
                const deviceTypes = post.deviceType || post.deviceTypes || [];
                const tags = post.tags || post.labels || [];
                const matchesKeyword = !keyword
                    || String(post.title || '').toLowerCase().includes(keyword)
                    || String(post.manager || '').toLowerCase().includes(keyword)
                    || tags.some(tag => String(tag).toLowerCase().includes(keyword));
                const matchesDevice = !this.deviceFilter || deviceTypes.includes(this.deviceFilter);

                return matchesKeyword && matchesDevice;
            });
        }
    },
    mounted() {
        this.loadPosts();
    },
    watch: {
        category() {
            this.keyword = '';
            this.deviceFilter = '';
            this.loadPosts();
        }
    },
    methods: {
        loadPosts() {
            this.currentPosts = postManager.getPostsByCategory(this.category, 'component');
        },
        handleDelete(deleteId) {
            postManager.deletePostById(deleteId);
            alert('삭제되었습니다.');
            this.loadPosts();
        },
        handleEdit(postData) {
            this.$router.push(`/posting/post?category=${postData.category}&id=${postData.id}`);
        }
    }
}
</script>
