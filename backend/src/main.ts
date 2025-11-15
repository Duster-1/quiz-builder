import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  });
  
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
