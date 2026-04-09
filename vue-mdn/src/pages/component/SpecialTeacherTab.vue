<template>
    <div class="page-component__all">
        <div class="page-component__top-wrap">
            <div class="page-component__title-wrap">
                <p class="page-component__sub-tit">컴포넌트</p>
                <h2 class="page-component__main-tit">기획전 선생님 탭메뉴</h2>
            </div>
            <div class="page-component-btn-wrap">
                <router-link to="../posting/post" class="page-component__add-post__btn" >게시글 등록</router-link>
            </div>
        </div>
        <div class="page-component-list__wrap">
            <div class="page-component-list__box">
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <div class="page-component-list__item-wrap">
                    <div class="page-component-list__item">
                        <div class="banner-list__item-img">
                            <a href="/src/assets/img/event_240930_32716.png" target="_blank">
                                <img src="../../assets/img/event_240930_32716.png" alt="">
                            </a>
                        </div>
                        <div class="page-component-list__item-txt">
                            <h6 class="page-component-list__item-txt-title">PC 사이트 메인 페이지 배너 가이드 (아이템 1)</h6>
                            <div class="page-component-list__item-label-box">
                                <span class="label label-device__type01">PC</span>
                                <span class="label label-device__type02">MO</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                            </div>
                            <div class="page-component-list__item-manager">
                                <strong>담당자 : </strong><span>정원석 대리</span>
                            </div>
                        </div>
                    </div>
                    <div class="page-component-list__item-code-area">
                        <a href="javascript:;" @click.prevent="toggleCodeSlide(1)"><span>Css Code Style</span></a>
                        <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 1 }">
                            <div class="codeArea__inner--box">
                                <pre>.banner-style-1 { ... }</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <div class="page-component-list__item-wrap">
                    <div class="page-component-list__item">
                        <div class="banner-list__item-img">
                            <a href="/src/assets/img/event_240930_32716.png" target="_blank">
                                <img src="../../assets/img/event_240930_32716.png" alt="">
                            </a>
                        </div>
                        <div class="page-component-list__item-txt">
                            <h6 class="page-component-list__item-txt-title">PC 사이트 메인 페이지 배너 가이드 (아이템 2)</h6>
                            <div class="page-component-list__item-label-box">
                                <span class="label label-device__type01">PC</span>
                                <span class="label label-device__type02">MO</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                            </div>
                            <div class="page-component-list__item-manager">
                                <strong>담당자 : </strong><span>정원석 대리</span>
                            </div>
                        </div>
                    </div>
                    <div class="page-component-list__item-code-area">
                        <a href="javascript:;" @click.prevent="toggleCodeSlide(2)"><span>Css Code Style</span></a>
                        <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 2 }">
                            <div class="codeArea__inner--box">
                                <pre>.banner-style-2 { ... }</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <div class="page-component-list__item-wrap">
                    <div class="page-component-list__item">
                        <div class="banner-list__item-img">
                            <a href="/src/assets/img/event_240930_32716.png" target="_blank">
                                <img src="../../assets/img/event_240930_32716.png" alt="">
                            </a>
                        </div>
                        <div class="page-component-list__item-txt">
                            <h6 class="page-component-list__item-txt-title">PC 사이트 메인 페이지 배너 가이드 (아이템 3)</h6>
                            <div class="page-component-list__item-label-box">
                                <span class="label label-device__type01">PC</span>
                                <span class="label label-device__type02">MO</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                            </div>
                            <div class="page-component-list__item-manager">
                                <strong>담당자 : </strong><span>정원석 대리</span>
                            </div>
                        </div>
                    </div>
                    <div class="page-component-list__item-code-area">
                        <a href="javascript:;" @click.prevent="toggleCodeSlide(3)"><span>Css Code Style</span></a>
                        <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 3 }">
                            <div class="codeArea__inner--box">
                                <pre>.banner-style-3 { ... }</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <div class="page-component-list__item-wrap">
                    <div class="page-component-list__item">
                        <div class="banner-list__item-img">
                            <a href="/src/assets/img/event_240930_32716.png" target="_blank">
                                <img src="../../assets/img/event_240930_32716.png" alt="">
                            </a>
                        </div>
                        <div class="page-component-list__item-txt">
                            <h6 class="page-component-list__item-txt-title">PC 사이트 메인 페이지 배너 가이드 (아이템 4)</h6>
                            <div class="page-component-list__item-label-box">
                                <span class="label label-device__type01">PC</span>
                                <span class="label label-device__type02">MO</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                            </div>
                            <div class="page-component-list__item-manager">
                                <strong>담당자 : </strong><span>정원석 대리</span>
                            </div>
                        </div>
                    </div>
                    <div class="page-component-list__item-code-area">
                        <a href="javascript:;" @click.prevent="toggleCodeSlide(4)"><span>Css Code Style</span></a>
                        <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 4 }">
                            <div class="codeArea__inner--box">
                                <pre>.banner-style-4 { ... }</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <div class="page-component-list__item-wrap">
                    <div class="page-component-list__item">
                        <div class="banner-list__item-img">
                            <a href="/src/assets/img/event_240930_32716.png" target="_blank">
                                <img src="../../assets/img/event_240930_32716.png" alt="">
                            </a>
                        </div>
                        <div class="page-component-list__item-txt">
                            <h6 class="page-component-list__item-txt-title">PC 사이트 메인 페이지 배너 가이드 (아이템 5)</h6>
                            <div class="page-component-list__item-label-box">
                                <span class="label label-device__type01">PC</span>
                                <span class="label label-device__type02">MO</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                                <span class="label label-type01__color01">배너</span>
                            </div>
                            <div class="page-component-list__item-manager">
                                <strong>담당자 : </strong><span>정원석 대리</span>
                            </div>
                        </div>
                    </div>
                    <div class="page-component-list__item-code-area">
                        <a href="javascript:;" @click.prevent="toggleCodeSlide(5)"><span>Css Code Style</span></a>
                        <div class="codeArea__inner" :class="{ 'codeArea-is-open': activeCodeSlideId === 5 }">
                            <div class="codeArea__inner--box">
                                <pre>.banner-style-5 { ... }</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
                <!-- 추후 컴포넌트로 만들어서 props 연결 학습 예정 -->
            </div>
        </div>
    </div>
</template>

<script>
import '../../css/pages/component/common.css';
import '../../css/pages/component/banner.css';

export default {
    data() {
        return {
            // 초기값 null은 아무것도 열리지 않은 상태입니다.
            activeCodeSlideId: null,   
        };
    },
    methods : {
        toggleCodeSlide(id) {
            // 1. 이미 열려있는 항목을 다시 누르면 닫습니다. (null 처리)
            // 2. 다른 항목을 누르면 해당 항목의 ID로 교체합니다. (그 항목만 열림)
            if (this.activeCodeSlideId === id) {
                this.activeCodeSlideId = null;
            } else {
                this.activeCodeSlideId = id;
            }
        }
    }
}
</script>