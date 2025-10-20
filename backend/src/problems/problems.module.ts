import { Module , forwardRef} from "@nestjs/common";
import { ProblemOwnerOrAdminGuard } from "src/auth/guards/problem-owner-or-admin.guard";
import { ProblemsService } from "./problems.service";
import { ProblemsController } from "./problems.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Problem } from "./entities/problem.entity";
import { SectionsModule } from "src/sections/sections.module"; // Contains Section Entity and Section Service
import { ProblemStatesModule } from "src/problem-states/problem-states.module";
import { UsersModule } from "src/users/users.module";

@Module({
    // Register Only The Problem Entity 
    imports:[TypeOrmModule.forFeature([Problem]),
    // import modules
    SectionsModule,
    forwardRef(() => ProblemStatesModule),
    forwardRef(() => UsersModule),
    ],
    controllers: [ProblemsController],
    providers:[
        ProblemsService,
        ProblemOwnerOrAdminGuard,
    ],
    exports: [ProblemsService],
})

export class ProblemsModule {}