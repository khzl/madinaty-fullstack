import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VotesService } from "./votes.service";
import { VotesController } from "./votes.controller";
import { Vote } from "./entities/vote.entity";
import { UsersModule } from "src/users/users.module";
import { ProblemsModule } from "src/problems/problems.module";

@Module({
    imports: [
        // Register Only The Vote Entity (primary entity)
        TypeOrmModule.forFeature([Vote]),
        // Foreign entity must import here 
        // imports Modules foreign entity
        UsersModule,
        ProblemsModule,
    ],
    controllers: [VotesController],
    providers: [
        VotesService,
    ],
    exports: [VotesService],
})

export class VotesModule {}