import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Quest character')
    .setDescription('The Quest character API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('QuestCharacter')
    .addTag('QuestTemplates')
    .addTag('Quest')
    .addTag('Auth')
    .addTag('Characters')
    .addTag('Users')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory());

  const nodeEnv = configService.get('nodeEnv');
  if (nodeEnv === 'development') {
    SwaggerModule.setup('api', app, documentFactory);
  }

  const port = configService.get('port');
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
