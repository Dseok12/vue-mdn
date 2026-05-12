// src/utils/postManager.js

export default {
    // 1. 특정 카테고리의 게시물만 쏙 뽑아오는 공통 함수
    getPostsByCategory(categoryName) {
        const allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
        return allPosts.filter(post => post.category === categoryName);
    },

    // 2. 특정 ID의 게시물을 삭제하고 덮어쓰는 공통 함수
    deletePostById(deleteId) {
        let allPosts = JSON.parse(localStorage.getItem('megaDbPosts')) || [];
        allPosts = allPosts.filter(post => post.id !== deleteId);
        localStorage.setItem('megaDbPosts', JSON.stringify(allPosts));
    }
};