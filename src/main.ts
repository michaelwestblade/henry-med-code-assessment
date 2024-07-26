import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port || 3000;

  const config = new DocumentBuilder()
    .setTitle('Scheduler')
    .setDescription('The Scheduler API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}
bootstrap();
