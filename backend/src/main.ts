import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 프론트엔드(Vue: 포트 3000 등)와 원활한 API 통신을 위한 CORS 허용 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 백엔드 서버는 프론트엔드 포트(3000)와 겹치지 않게 8080 포트로 변경합니다.
  await app.listen(8080);
  console.log(`🚀 백엔드 서버가 http://localhost:8080 에서 실행 중입니다.`);
}
bootstrap();