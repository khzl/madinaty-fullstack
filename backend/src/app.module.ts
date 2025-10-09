import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entity/user.entity';
import { LoggerMiddleware } from './common/Middleware/logger.middleware';

@Module({
  imports: [
    // Load File .env 
    ConfigModule.forRoot({
      isGlobal: true, // ConfigService public in all project 
    }),

    // database connection 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USERNAME'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASENAME'),
        entities: [User],
        autoLoadEntities: true,
        synchronize: true,  // Disable in production 
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule, // Register Users Module
    AuthModule, // Register Auth Module
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

