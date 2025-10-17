import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/Interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Server static file 
  app.useStaticAssets(join(__dirname, '...' , 'uploads'),{
    prefix: '/uploads/',
  });


  const config = new DocumentBuilder()
    .setTitle('Madinaty API')
    .setDescription('API documentation for the Madinaty application')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable global Interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
  );

  // Enable Global Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
