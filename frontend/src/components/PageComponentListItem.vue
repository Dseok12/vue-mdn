<template>
    <div class="page-component-list__item-wrap" v-if="item">
        <div class="page-component-list__item">
            <div class="banner-list__item-img">
                <router-link :to="detailPath">
                    <img :src="displayItem.imgUrl" alt="게시물 이미지">
                </router-link>
            </div>

            <div class="page-component-list__item-txt">
                <h6 class="page-component-list__item-txt-title">
                    <router-link :to="detailPath">{{ displayItem.title }}</router-link>
                </h6>

                <div class="page-component-list__item-label-box">
                    <span class="label label-device__type01" v-for="device in displayItem.deviceType" :key="device">
                        {{ device }}
                    </span>
                    <span class="label label-type01__color01" v-for="(tag, index) in displayItem.tags" :key="'tag-'+index">
                        {{ tag }}
                    </span>
                </div>

                <div class="page-component-list__item-manager">
                    <strong>담당자: </strong><span>{{ displayItem.manager }}</span>
                </div>
                <ul class="page-component-list__item-link">
                    <li>
                        <span>프로젝트 게시판:</span>
                        <a v-if="displayItem.links.board" :href="displayItem.links.board" target="_blank">
                            {{ displayItem.links.board }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>

                    <li>
                        <span>PC 링크:</span>
                        <a v-if="displayItem.links.pc" :href="displayItem.links.pc" target="_blank">
                            {{ displayItem.links.pc }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>

                    <li>
                        <span>MOBILE 링크:</span>
                        <a v-if="displayItem.links.mo" :href="displayItem.links.mo" target="_blank">
                            {{ displayItem.links.mo }}
                        </a>
                        <p v-else>링크가 없습니다.</p>
                    </li>
                </ul>
            </div>

            <div class="page-component-list__item-btn-box" style="display: flex; flex-direction: column; gap: 5px;">
                <button class="page-component-btn page-component-btn__cancel-ok" @click="clickEdit">수정</button>
                <button class="page-component-btn page-component-btn__cancel-no" @click="clickDelete">삭제</button>
            </div>
        </div>

        <div class="page-component-list__item-code-area">
            <a href="javascript:;" @click.prevent="toggleCodeSlide(item.id)"><span>Css Code Style</span></a>

            <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === item.id }">
                <div class="codeArea__inner--box">
                    <pre>{{ displayItem.cssCode }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageComponentListItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            activeCodeSlideId: null,
        };
    },
    computed: {
        displayItem() {
            const links = this.item.links || {};
            return {
                ...this.item,
                imgUrl: this.item.imgUrl || this.item.thumbnailUrl,
                deviceType: this.item.deviceType || this.item.deviceTypes || [],
                tags: this.item.tags || this.item.labels || [],
                links: {
                    board: links.board || this.item.MegaProjectLink || '',
                    pc: links.pc || this.item.PcLink || '',
                    mo: links.mo || this.item.MoLink || '',
                }
            };
        },
        detailPath() {
            return `/component/${this.displayItem.category}/${this.displayItem.id}`;
        }
    },
    methods : {
        toggleCodeSlide(id) {
            if (this.activeCodeSlideId === id) {
                this.activeCodeSlideId = null;
            } else {
                this.activeCodeSlideId = id;
            }
        },
        clickEdit() {
            this.$emit('edit', this.item);
        },
        clickDelete() {
            if(confirm('정말 이 게시물을 삭제하시겠습니까?')) {
                this.$emit('delete', this.item.id);
            }
        }
    }
}
</script>
