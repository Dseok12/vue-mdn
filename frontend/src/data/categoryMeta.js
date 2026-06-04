export const componentCategories = [
  { title: '배너', category: 'banner' },
  { title: '퀵메뉴', category: 'quickmenu' },
  { title: '게시판', category: 'board' },
  { title: '탭메뉴', category: 'tabmenu' },
  { title: '리뷰', category: 'review' },
  { title: '이벤트', category: 'event' },
  { title: '기획/선생님 탭', category: 'specialteachertab' },
  { title: '동영상', category: 'video' },
  { title: '팝업', category: 'popup' },
  { title: '쿠폰', category: 'coupon' },
  { title: '상품 리스트', category: 'productlist' },
];

export const projectCategories = [
  { title: '메가선생님', category: 'megateacher' },
  { title: '메가패스', category: 'megapass' },
  { title: '수능/내신', category: 'examschool' },
  { title: '대학별고사', category: 'univexam' },
  { title: '입시정보', category: 'examhighscool' },
  { title: '이벤트 프로모션', category: 'eventpromotion' },
  { title: '온라인서점', category: 'onlinebookstore' },
  { title: '메가캠페인', category: 'megacampaign' },
];

export function getCategoryTitle(type, category) {
  const categories = type === 'project' ? projectCategories : componentCategories;
  const targetCategory = categories.find(item => item.category === category);

  return targetCategory ? targetCategory.title : category;
}
