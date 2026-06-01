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

function getPostTime(post) {
    const dateValue = post.updatedAt || post.createdAt || post.date || '';
    const parsedTime = new Date(dateValue).getTime();

    if (!Number.isNaN(parsedTime)) {
        return parsedTime;
    }

    return Number(post.id) || 0;
}

function sortNewestFirst(posts) {
    return [...posts].sort((a, b) => {
        const timeDiff = getPostTime(b) - getPostTime(a);

        if (timeDiff !== 0) {
            return timeDiff;
        }

        return (Number(b.id) || 0) - (Number(a.id) || 0);
    });
}

export { normalizePost };

export default {
    getAllPosts() {
        return sortNewestFirst(readPosts().map(normalizePost));
    },

    getPostsByCategory(categoryName, type) {
        return sortNewestFirst(readPosts()
            .map(normalizePost)
            .filter(post => post.category === categoryName && (!type || post.type === type)));
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
