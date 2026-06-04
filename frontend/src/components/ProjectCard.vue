<template>
    <div class="thumbnail-card">
        <div class="thumbnail-img">
            <router-link :to="detailPath">
                <img :src="displayItem.imgUrl" :alt="displayItem.title">
            </router-link>
        </div>
        <div class="thumbnail-content">
            <h3 class="thumbnail-title">
                <router-link :to="detailPath">{{ displayItem.title }}</router-link>
            </h3>
            <div class="tags-container">
                <span class="tag" v-for="(tag, index) in displayItem.tags" :key="index">
                    {{ tag }}
                </span>
            </div>
            <div class="thumbnail-date">{{ displayItem.date }}</div>

            <div class="projectLinks">
                <a :href="displayItem.links.board" target="_blank" v-if="displayItem.links.board">
                    <img src="../assets/img/project_btn01.png" alt="게시판">
                </a>
                <a :href="displayItem.links.pc" target="_blank" v-if="displayItem.links.pc">
                    <img src="../assets/img/pc_btn02.png" alt="PC">
                </a>
                <a :href="displayItem.links.mo" target="_blank" v-if="displayItem.links.mo">
                    <img src="../assets/img/mo_btn03.png" alt="MO">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        displayItem() {
            const links = this.item.links || {};
            return {
                ...this.item,
                tags: this.item.tags || this.item.labels || [],
                imgUrl: this.item.imgUrl || this.item.thumbnailUrl,
                date: this.item.date || this.item.createdAt,
                links: {
                    board: links.board || this.item.MegaProjectLink || '',
                    pc: links.pc || this.item.PcLink || '',
                    mo: links.mo || this.item.MoLink || '',
                }
            };
        },
        detailPath() {
            return `/project/${this.displayItem.category}/${this.displayItem.id}`;
        }
    }
}
</script>
