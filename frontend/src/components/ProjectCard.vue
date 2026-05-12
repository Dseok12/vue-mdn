<template>
    <div class="thumbnail-card">
        <div class="thumbnail-img">
            <img :src="item.imgUrl" :alt="item.title">
        </div>
        <div class="thumbnail-content">
            <h3 class="thumbnail-title">{{ item.title }}</h3>
            <div class="tags-container">
                <span class="tag" v-for="(tag, index) in item.tags" :key="index">
                    {{ tag }}
                </span>
            </div>
            <div class="thumbnail-date">{{ item.date }}</div>
            
            <div class="projectLinks">
                <a href="javascript:;" v-if="item.links.board"><img src="../assets/img/project_btn01.png" alt="게시판"></a>
                <a href="javascript:;" v-if="item.links.pc"><img src="../assets/img/pc_btn02.png" alt="PC"></a>
                <a href="javascript:;" v-if="item.links.mo"><img src="../assets/img/mo_btn03.png" alt="MO"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    // 💡 부모(MegaTeacher.vue)가 넘겨줄 데이터 명세서입니다.
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>