<template>
    <div>
        <div class="page-project__top-wrap">
            <div class="page-project__title-wrap">
                <p class="page-project__sub-tit">프로젝트</p>
                <h2 class="page-project__main-tit">메가선생님</h2>
            </div>
            <div class="page-project-btn-wrap">
                <router-link to="../posting/post" class="page-project__add-post__btn" >게시글 등록</router-link>
            </div>
        </div>

        <div class="page-project-contents">
            <div class="page-project-contents__box">
                
                <div class="thumbnail-container">
                    <ProjectCard 
                        v-for="프로젝트 in 화면에_보여줄_자른_목록" 
                        :key="프로젝트.id" 
                        :item="프로젝트" 
                    />
                </div>

                <div class="pagination" id="pagination">
                    <button 
                        :disabled="현재_보고있는_페이지 === 1" 
                        @click="페이지_이동하기(현재_보고있는_페이지 - 1)"
                    >
                        이전
                    </button>
                    
                    <button 
                        v-for="페이지번호 in 총_페이지_수" 
                        :key="페이지번호" 
                        :class="{ active: 현재_보고있는_페이지 === 페이지번호 }"
                        @click="페이지_이동하기(페이지번호)"
                        style="margin: 0 5px;"
                    >
                        {{ 페이지번호 }}
                    </button>
                    
                    <button 
                        :disabled="현재_보고있는_페이지 === 총_페이지_수" 
                        @click="페이지_이동하기(현재_보고있는_페이지 + 1)"
                    >
                        다음
                    </button>
                </div>

                <div class="page-info" id="pageInfo">
                    전체 {{ 전체_프로젝트_목록.length }}개 중 {{ 자르기_시작할_번호 + 1 }}-{{ 자르기_끝낼_번호 }}개 표시 중
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import '../../css/pages/project/common.css';
import ProjectCard from '../../components/ProjectCard.vue';

export default {
    components: {
        ProjectCard
    },
    data() {
        return {
            현재_보고있는_페이지: 1,  
            한_화면에_보여줄_개수: 8, 
            
            전체_프로젝트_목록: [
                // (아까와 동일한 15개의 더미 데이터)
                { id: 1, title: '수리논술팀 런칭_홍보', tags: ['수리논술', '이벤트'], date: '2026-02-24', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+1', links: { board: true, pc: true, mo: true } },
                { id: 2, title: '국어영역 신규강사 입성', tags: ['국어', '신규런칭'], date: '2026-02-20', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+2', links: { board: true, pc: true, mo: false } },
                { id: 3, title: '수능 D-100 응원 캠페인', tags: ['공통', '캠페인'], date: '2026-02-15', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+3', links: { board: true, pc: true, mo: true } },
                { id: 4, title: '영어영역 파이널 모의고사', tags: ['영어', '모의고사'], date: '2026-02-10', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+4', links: { board: true, pc: false, mo: true } },
                { id: 5, title: '과탐/사탐 개념완성 반값', tags: ['과탐', '사탐', '할인'], date: '2026-02-05', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+5', links: { board: false, pc: true, mo: true } },
                { id: 6, title: '수학의 정석 해설특강', tags: ['수학', '해설'], date: '2026-01-28', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+6', links: { board: true, pc: true, mo: true } },
                { id: 7, title: '2027학년도 입시 설명회', tags: ['설명회', '입시'], date: '2026-01-20', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+7', links: { board: true, pc: true, mo: false } },
                { id: 8, title: '겨울방학 윈터스쿨 모집', tags: ['윈터스쿨', '모집'], date: '2026-01-15', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+8', links: { board: true, pc: true, mo: true } },
                { id: 9, title: '한국사 핵심요약 단기특강', tags: ['한국사', '특강'], date: '2026-01-10', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+9', links: { board: true, pc: true, mo: true } },
                { id: 10, title: 'N수생 전용 특별 패키지', tags: ['N수생', '패키지'], date: '2026-01-05', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+10', links: { board: true, pc: true, mo: true } },
                { id: 11, title: '수능 만점자 인터뷰 영상', tags: ['인터뷰', '영상'], date: '2025-12-28', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+11', links: { board: false, pc: true, mo: true } },
                { id: 12, title: '신학기 플래너 증정 이벤트', tags: ['굿즈', '이벤트'], date: '2025-12-20', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+12', links: { board: true, pc: true, mo: true } },
                { id: 13, title: '프리미엄 모의고사 오픈', tags: ['모의고사', '프리미엄'], date: '2025-12-15', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+13', links: { board: true, pc: true, mo: true } },
                { id: 14, title: '제2외국어 기초 발음 특강', tags: ['제2외국어', '특강'], date: '2025-12-10', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+14', links: { board: true, pc: true, mo: false } },
                { id: 15, title: '수능채점 풀서비스 연동', tags: ['수능', '풀서비스'], date: '2025-11-20', imgUrl: 'https://placehold.co/400x300/e2e8f0/475569?text=Project+15', links: { board: true, pc: true, mo: true } }
            ]
        }
    },
    // ✨ 화면에 보여줄 데이터를 실시간으로 계산하는 두뇌
    computed: {
        총_페이지_수() {
            // 전체 15개를 8개로 나누면 1.875 -> Math.ceil(올림) 하면 2페이지가 나옵니다.
            return Math.ceil(this.전체_프로젝트_목록.length / this.한_화면에_보여줄_개수);
        },
        자르기_시작할_번호() {
            // 컴퓨터는 0번부터 숫자를 셉니다. 1페이지면 (1-1)*8 = 0번부터 자릅니다.
            return (this.현재_보고있는_페이지 - 1) * this.한_화면에_보여줄_개수;
        },
        자르기_끝낼_번호() {
            let 끝번호 = this.자르기_시작할_번호 + this.한_화면에_보여줄_개수;
            // 만약 남은 데이터가 8개가 안 돼서 범위를 넘어가면, 그냥 전체 개수까지만 자릅니다.
            return 끝번호 > this.전체_프로젝트_목록.length ? this.전체_프로젝트_목록.length : 끝번호;
        },
        화면에_보여줄_자른_목록() {
            // 원본 목록에서 시작 번호부터 끝 번호 직전까지 싹둑 잘라서 화면에 던져줍니다.
            return this.전체_프로젝트_목록.slice(this.자르기_시작할_번호, this.자르기_끝낼_번호);
        }
    },
    methods: {
        페이지_이동하기(누른_페이지_번호) {
            // 정상적인 페이지 번호를 눌렀을 때만 이동시킵니다.
            if (누른_페이지_번호 >= 1 && 누른_페이지_번호 <= this.총_페이지_수) {
                this.현재_보고있는_페이지 = 누른_페이지_번호;
                
                // 페이지가 바뀌면 부드럽게 화면 맨 위로 올려줍니다.
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
}
</script>