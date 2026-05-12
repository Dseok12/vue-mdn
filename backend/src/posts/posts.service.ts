import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  // 💡 핵심 해결: 배열의 타입을 any[]로 명시해 주었습니다!
  private posts: any[] = [];

  // 1. 모든 게시물 가져오기
  findAll() {
    return this.posts;
  }

  // 2. 새 게시물 저장하기 (프론트엔드의 데이터를 받아옵니다)
  create(createPostDto: any) {
    const newPost = {
      ...createPostDto,
      id: Date.now(), // 고유 ID 부여
      date: new Date().toISOString().split('T')[0], // 등록일 부여
    };
    this.posts.unshift(newPost); // 배열 맨 앞에 추가
    return newPost;
  }

  // 3. 특정 게시물 삭제하기
  remove(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
    return { message: '게시물이 성공적으로 삭제되었습니다.', deletedId: id };
  }
}