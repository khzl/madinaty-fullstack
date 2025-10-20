import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe , Logger } from '@nestjs/common';
import { TransformInterceptor } from './common/Interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {

  const logger = new Logger('NestApplication');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  app.use(helmet());

  app.enableCors({
        origin: NODE_ENV === 'development' ? '*' : process.env.CORS_ORIGIN,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  // Server static file 
  app.useStaticAssets(join(__dirname, '...' , 'uploads'),{
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Madinaty API')
    .setDescription('API documentation for the Madinaty application')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('problems', 'Crowdsourced problem reporting') 
    .addTag('sections', 'Administrative section management')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'BearerAuth')
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
  }));

  // Enable global Interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
  );

  // Enable Global Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT);
  logger.log(`Application is running in ${NODE_ENV} mode on: ${await app.getUrl()}`);
  logger.log(`Swagger documentation available at: ${await app.getUrl()}/api/docs`);
  
}
bootstrap();
