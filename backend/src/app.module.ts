import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProblemsModule } from './problems/problems.module';
import { SectionsModule } from './sections/sections.module';
import { VotesModule } from './votes/votes.module';
import { DonationsModule } from './donations/donations.module';
import { ProblemStatesModule } from './problem-states/problem-states.module';
import { ProblemStatusHistoryModule } from './problem-status-History/problem-status-history.module';
// import entities
import { User } from './users/entity/user.entity';
import { Problem } from './problems/entities/problem.entity';
import { Section } from './sections/entities/section.entity';
import { Vote } from './votes/entities/vote.entity';
import { Donation } from './donations/entities/donation.entity';
import { ProblemState } from './problem-states/entities/problem-state.entity';
import { ProblemStatusHistory } from './problem-status-History/entities/problem-status-history.entity';

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
        // Register All Entity Here 
        entities: 
        [
          User,
          Problem,
          Section,
          Vote,
          Donation,
          ProblemState,
          ProblemStatusHistory
        ],
        //autoLoadEntities: true,
        synchronize: true,  // Disable in production 
      }),
    }),
    TypeOrmModule.forFeature(
    [
        User,
        Problem,
        Section,
        Vote,
        Donation,
        ProblemState,
        ProblemStatusHistory
    ]),
    UsersModule, // Register Users Module
    ProblemsModule, // Register Problem Module 
    SectionsModule, // Register Section Module
    VotesModule, // Register Votes Module
    DonationsModule, // Register Donations Module
    ProblemStatesModule, // Register ProblemStates Module
    AuthModule, // Register Auth Module
    ProblemStatusHistoryModule, // Register ProblemStatusHistory Module
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

