import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProblemStatesService } from "./problem-states.service";
import { ProblemStatesController } from "./problem-states.controller";
import { ProblemState } from "./entities/problem-state.entity";
import { ProblemsModule } from "src/problems/problems.module";

@Module({
    imports: [
        // Register Only Main Entity
        TypeOrmModule.forFeature([ProblemState]),
        // import module foreign entity
        ProblemsModule,
    ],
    controllers: [ProblemStatesController],
    providers: [
        ProblemStatesService,
    ],
    exports: [ProblemStatesService],
})

export class ProblemStatesModule {}