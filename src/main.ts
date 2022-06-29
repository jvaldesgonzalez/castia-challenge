import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet'; // basic HTTP headers security plugin
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //middlewares
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  app.enableCors();

  //load config service in main.ts
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;

  const openapiConfig = new DocumentBuilder()
    .setTitle("Castia's Challenge")
    .setDescription('Github REST API documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, openapiConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
  Logger.log(`🚀 Server running on port :${PORT}`, 'NestApplication');
}
bootstrap();
