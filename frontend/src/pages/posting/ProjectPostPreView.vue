<template>
    <div class="page-component-list__item-wrap" v-if="post">
        <div class="page-component-list__item">
            <div class="banner-list__item-img">
                <a :href="displayPost.imgUrl" target="_blank">
                    <img :src="displayPost.imgUrl" alt="배너 이미지">
                </a>
            </div>
            <div class="page-component-list__item-txt">
                <h6 class="page-component-list__item-txt-title">
                    {{ displayPost.title || '제목을 입력해주세요' }}
                </h6>
                <div class="page-component-list__item-label-box">
                    <span class="label label-device__type01" v-for="device in displayPost.deviceType" :key="device">{{ device }}</span>
                    <span class="label label-type01__color01" v-for="(tag, index) in displayPost.tags" :key="index">{{ tag }}</span>
                </div>
                <ul class="page-component-list__item-link">
                    <li>
                        <span>프로젝트 게시판:</span>
                        <a v-if="displayPost.links.board" :href="displayPost.links.board" target="_blank">
                            {{ displayPost.links.board }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>

                    <li>
                        <span>PC 링크:</span>
                        <a v-if="displayPost.links.pc" :href="displayPost.links.pc" target="_blank">
                            {{ displayPost.links.pc }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>

                    <li>
                        <span>MOBILE 링크:</span>
                        <a v-if="displayPost.links.mo" :href="displayPost.links.mo" target="_blank">
                            {{ displayPost.links.mo }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostPreview',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    computed: {
        displayPost() {
            const links = this.post.links || {};
            return {
                ...this.post,
                imgUrl: this.post.imgUrl || this.post.thumbnailUrl,
                deviceType: this.post.deviceType || this.post.deviceTypes || [],
                tags: this.post.tags || this.post.labels || [],
                links: {
                    board: links.board || this.post.MegaProjectLink || '',
                    pc: links.pc || this.post.PcLink || '',
                    mo: links.mo || this.post.MoLink || '',
                }
            };
        }
    },
    methods : {
    }
}
</script>
