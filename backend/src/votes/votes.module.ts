import { Module , forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VotesService } from "./votes.service";
import { VotesController } from "./votes.controller";
import { Vote } from "./entities/vote.entity";
import { UsersModule } from "src/users/users.module";
import { ProblemsModule } from "src/problems/problems.module";
import { Problem } from "src/problems/entities/problem.entity";
@Module({
    imports: [
        // Register Only The Vote Entity (primary entity)
        TypeOrmModule.forFeature([Vote,Problem]),
        // Foreign entity must import here 
        // imports Modules foreign entity
        forwardRef(() => UsersModule),
        forwardRef(() => ProblemsModule),
    ],
    controllers: [VotesController],
    providers: [
        VotesService,
    ],
    exports: [
        VotesService,
        TypeOrmModule.forFeature([Vote,Problem]),
    ],
})

export class VotesModule {}