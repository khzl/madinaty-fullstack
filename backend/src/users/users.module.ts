import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProblemsModule } from 'src/problems/problems.module';
import { VotesModule } from 'src/votes/votes.module';
import { DonationsModule } from 'src/donations/donations.module';
import { ProblemStatusHistory } from 'src/problem-status-History/entities/problem-status-history.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    // register only primary entity 
    TypeOrmModule.forFeature([User]),
    // import foreign entity 
    ProblemsModule,
    VotesModule,
    DonationsModule,
    ProblemStatusHistory,
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})

export class UsersModule {}
