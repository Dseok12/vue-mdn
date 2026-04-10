<template>
    <div class="page-component-list__item-wrap"v-if="post">
        <div class="page-component-list__item">
            <div class="banner-list__item-img">
                <a :href="post.imgUrl" target="_blank">
                    <img :src="post.imgUrl" alt="배너 이미지">
                </a>
            </div>
            <div class="page-component-list__item-txt">
                <h6 class="page-component-list__item-txt-title">
                    {{ post.title || '제목을 입력해주세요' }}
                </h6>
                <div class="page-component-list__item-label-box">
                    <span class="label label-device__type01" v-for="device in post.deviceType" :key="device">{{ device }}</span>
                    <span class="label label-type01__color01" v-for="(label, index) in post.labels" :key="index">{{ label }}</span>
                </div>
                <div class="page-component-list__item-manager">
                    <strong>담당자 : </strong><span>{{ post.manager || '담당자 미정' }}</span>
                </div>
            </div>
        </div>
        <div class="page-component-list__item-code-area">
            <a href="javascript:;" @click.prevent="toggleCodeSlide(1)"><span>Css Code Style</span></a>
            <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 1 }">
                <div class="codeArea__inner--box">
                    <pre>{{ post.cssCode || 'CSS 코드가 없습니다.' }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostPreview',
    // 에디터에서 'post'라는 이름으로 데이터를 던져주면 여기서 받습니다.
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            activeCodeSlideId: null,
        };
    },
    methods : {
        toggleCodeSlide(id) {
            if (this.activeCodeSlideId === id) {
                this.activeCodeSlideId = null;
            } else {
                this.activeCodeSlideId = id;
            }
        }
    }
}
</script>