import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProblemStatusHistoryService } from "./problem-status-history.service";
import { ProblemStatusHistoryController } from "./problem-status-history.controller";
import { ProblemStatusHistory } from "./entities/problem-status-history.entity";
import { ProblemsModule } from "src/problems/problems.module";
import { ProblemStatesModule } from "src/problem-states/problem-states.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        // Register Only Main Entity
        TypeOrmModule.forFeature([ProblemStatusHistory]),
        // import Foreign Entity
        ProblemsModule,
        ProblemStatesModule,
        UsersModule,
    ],
    controllers: [ProblemStatusHistoryController],
    providers: [ProblemStatusHistoryService],
    exports: [ProblemStatusHistoryService],
})

export class ProblemStatusHistoryModule {}