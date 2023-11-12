// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());

//   app.enableCors({
//     allowedHeaders: '*',
//     origin: '*',
//   });

//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Nếu bạn cần hỗ trợ đăng nhập từ nguồn khác
  }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
