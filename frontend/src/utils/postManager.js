// src/utils/postManager.js

const STORAGE_KEY = 'megaDbPosts';

function readPosts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function writePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function normalizePost(post = {}) {
    const links = post.links || {};
    const tags = post.tags || post.labels || [];
    const createdAt = post.createdAt || post.date || new Date().toISOString().split('T')[0];

    return {
        ...post,
        type: post.type || 'component',
        tags,
        labels: post.labels || tags,
        thumbnailUrl: post.thumbnailUrl || post.imgUrl || 'https://placehold.co/600x800',
        imgUrl: post.imgUrl || post.thumbnailUrl || 'https://placehold.co/600x800',
        links: {
            board: links.board || post.MegaProjectLink || '',
            pc: links.pc || post.PcLink || '',
            mo: links.mo || post.MoLink || '',
        },
        MegaProjectLink: post.MegaProjectLink || links.board || '',
        PcLink: post.PcLink || links.pc || '',
        MoLink: post.MoLink || links.mo || '',
        createdAt,
        updatedAt: post.updatedAt || createdAt,
        date: post.date || createdAt,
    };
}

export { normalizePost };

export default {
    getAllPosts() {
        return readPosts().map(normalizePost);
    },

    getPostsByCategory(categoryName, type) {
        return readPosts()
            .map(normalizePost)
            .filter(post => post.category === categoryName && (!type || post.type === type));
    },

    savePost(postData) {
        const posts = readPosts();
        const normalizedPost = normalizePost(postData);
        const index = posts.findIndex(post => post.id === normalizedPost.id);

        if (index >= 0) {
            posts[index] = normalizedPost;
        } else {
            posts.unshift(normalizedPost);
        }

        writePosts(posts);
        return normalizedPost;
    },

    deletePostById(deleteId) {
        const posts = readPosts().filter(post => post.id !== deleteId);
        writePosts(posts);
    }
};
