import { Controller,Get,Post,Body,
    Patch,Param,Delete,UseGuards,ParseIntPipe
 } from "@nestjs/common";
import { ApiTags,ApiOperation,ApiResponse,ApiBearerAuth,
    ApiUnauthorizedResponse,ApiForbiddenResponse,ApiNotFoundResponse,
    ApiConflictResponse,ApiBadRequestResponse,
 } from "@nestjs/swagger";
import { ProblemStatesService } from "./problem-states.service";
import { CreateProblemStateDto } from "./dto/create-problem-state.dto";
import { UpdateProblemStateDto } from "./dto/update-problem-state.dto";
import { ProblemState } from "./entities/problem-state.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/users/entity/user.entity";

@ApiTags('problem-states')
@ApiBearerAuth()
@Controller('problem-states')
export class ProblemStatesController {
    constructor(private readonly problemStateService: ProblemStatesService) {}

    // create state (Admin/government Only)
    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Create a New Problem State Definition (Admin / Government Only)'
    })
    @ApiResponse({
        status: 201,
        description: 'State Created Successfully',
        type: ProblemState
    })
    @ApiConflictResponse({
        description: 'A State With This Name Already Exists'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized (Missing Token)'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Does Not Have The Necessary Role'
    })
    create(stateDto: CreateProblemStateDto){
        return this.problemStateService.create(stateDto);
    }

    // find all State 
    @Get()
    @ApiOperation({
        summary: 'Retrieve All Problem State Definitions (publicly available)'
    })
    @ApiResponse({
        status: 200,
        description: 'List Of Problem States',
        type: [ProblemState]
    })
    findAll() {
        return this.problemStateService.findAll();
    }

    // find one state 
    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a Single Problem State By ID'
    })
    @ApiResponse({
        status: 200,
        description: 'the Problem State Definition',
        type: ProblemState
    })
    @ApiNotFoundResponse({
        description: 'State Not Found'
    })
    findOne(@Param('id',ParseIntPipe)id: number){
        return this.problemStateService.findOne(id);
    }

    // update 
    @Patch(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Update An Existing Problem State Definition (Admin/Government Only)'
    })
    @ApiResponse({
        status: 200,
        description: 'State Updated Successfully',
        type: ProblemState
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Does Not Have The Necessary Role)'
    })
    @ApiNotFoundResponse({
        description: 'State Not Found'
    })
    @ApiConflictResponse({
        description: 'The New State Name Already Exists'
    })
    update(
        @Param('id',ParseIntPipe)id: number,
        @Body()stateDto: UpdateProblemStateDto
    ){
        return this.problemStateService.update(id,stateDto);
    }

    // remove 
    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Delete a Problem State Definition (Admin/Government Only)'
    })
    @ApiResponse({
        status: 200,
        description: 'State Delete Successfully'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Does Not Have the Necessary Role)'
    })
    @ApiNotFoundResponse({
        description: 'State Not Found'
    })
    @ApiBadRequestResponse({
        description: 'Bad Request (State Cannot Be Deleted as It Is Linked To Existing Problems)'
    })
    remove(@Param('id',ParseIntPipe)id: number){
        return this.problemStateService.remove(id);
    }
    
}