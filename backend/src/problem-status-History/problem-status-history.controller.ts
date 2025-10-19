import { Controller,Get,Param,ParseIntPipe,UseGuards } from "@nestjs/common";
import { ApiTags,ApiOperation,ApiResponse,
    ApiBearerAuth,ApiNotFoundResponse,
 } from "@nestjs/swagger";
import { ProblemStatusHistoryService } from "./problem-status-history.service";
import { ProblemStatusHistory } from "./entities/problem-status-history.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('status-history')
@ApiBearerAuth()
@Controller('status-history')
export class ProblemStatusHistoryController {

    constructor(private readonly HistoryService: ProblemStatusHistoryService) {}

    @Get('problem/:problemId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Retrieve The Status History Log For a Specific Problem'
    })
    @ApiResponse({
        status: 200,
        description: 'List Of All Status Changes For The Given Problem',
        type: [ProblemStatusHistory]
    })
    findAllForProblem(@Param('problemId',ParseIntPipe)problemId: number): Promise<ProblemStatusHistory[]>{
        return this.HistoryService.FindAllForProblem(problemId);
    }
}