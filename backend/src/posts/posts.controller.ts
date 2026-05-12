import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts') // 💡 http://localhost:8080/posts 주소를 담당합니다.
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // POST 요청: 게시물 등록
  @Post()
  create(@Body() createPostDto: any) {
    return this.postsService.create(createPostDto);
  }

  // GET 요청: 모든 게시물 조회
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // DELETE 요청: 게시물 삭제 (예: /posts/1700000000)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // URL로 넘어온 id는 문자열이므로 숫자(+)로 변환하여 서비스로 넘깁니다.
    return this.postsService.remove(+id);
  }
}