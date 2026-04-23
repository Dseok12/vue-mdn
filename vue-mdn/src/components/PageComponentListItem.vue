<template>
    <div class="page-component-list__item-wrap" v-if="item">
        <div class="page-component-list__item">
            
            <div class="banner-list__item-img">
                <a :href="item.imgUrl" target="_blank">
                    <img :src="item.imgUrl" alt="배너 이미지">
                </a>
            </div>
            
            <div class="page-component-list__item-txt">
                <h6 class="page-component-list__item-txt-title">{{ item.title }}</h6>
                
                <div class="page-component-list__item-label-box">
                    <span class="label label-device__type01" v-for="device in item.deviceType" :key="device">
                        {{ device }}
                    </span>
                    <span class="label label-type01__color01" v-for="(label, index) in item.labels" :key="'label-'+index">
                        {{ label }}
                    </span>
                </div>
                
                <div class="page-component-list__item-manager">
                    <strong>담당자 : </strong><span>{{ item.manager }}</span>
                </div>
                <ul class="page-component-list__item-link">
                    <li><span>프로젝트 게시판:</span> <a :href="item.MegaProjectLink"  target="_blank">{{ item.MegaProjectLink }}</a></li>
                    <li><span>PC 링크:</span> <a :href="item.PcLink"  target="_blank">{{ item.PcLink }}</a></li>
                    <li><span>MOBILE 링크:</span> <a :href="item.MoLink"  target="_blank">{{ item.MoLink }}</a></li>
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
                    <pre>{{ item.cssCode }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageComponentListItem',
    // ✨ 핵심: 부모 컴포넌트에서 내려주는 'item' 데이터를 받을 준비를 합니다!
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
    methods : {
        toggleCodeSlide(id) {
            if (this.activeCodeSlideId === id) {
                this.activeCodeSlideId = null;
            } else {
                this.activeCodeSlideId = id;
            }
        },
        // ✨ 수정 버튼 클릭 시
        clickEdit() {
            // 부모(Banner.vue 등)에게 나 수정할 거라고 데이터와 함께 알려줍니다.
            this.$emit('edit', this.item);
        },
        // ✨ 삭제 버튼 클릭 시
        clickDelete() {
            if(confirm('정말 이 게시물을 삭제하시겠습니까?')) {
                // 부모에게 내 고유 ID를 주면서 삭제해달라고 요청합니다.
                this.$emit('delete', this.item.id);
            }
        }
    }
}
</script>