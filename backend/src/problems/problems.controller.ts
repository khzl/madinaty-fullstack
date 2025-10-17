import { Request, Body, Post, UseGuards,
    Controller,Get,Patch,Param,Delete,ParseIntPipe,Query,Req
 } from "@nestjs/common";
import { ApiTags,ApiOperation,ApiResponse,
    ApiBearerAuth,ApiBody,ApiUnauthorizedResponse,
    ApiForbiddenResponse,ApiNotFoundResponse,
    ApiBadRequestResponse,ApiOkResponse,
 } from "@nestjs/swagger";
import { ProblemsService } from "./problems.service";
import { CreateProblemDto } from "./dto/create-problem.dto";
import { UpdateProblemDto } from "./dto/update-problem.dto";
import { ProblemQueryDto } from "./dto/problem-query.dto";
import { Problem } from "./entities/problem.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/users/entity/user.entity";
import { ProblemOwnerOrAdminGuard } from "src/auth/guards/problem-owner-or-admin.guard";

@ApiTags('problems')
@ApiBearerAuth()
@Controller('problems')
export class ProblemsController {

    constructor(private readonly problemsService: ProblemsService) {}


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Create a New Problem Report'
    })
    @ApiBody({
        type: CreateProblemDto
    })
    @ApiResponse({
        status: 201,
        description: 'problem Reported Successfully',
        type: Problem
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized (Missing token)'
    })
    @ApiBadRequestResponse({
        description: 'Invalid Data or Section/state Id Not Found'
    })
    create(@Body() problemDto: CreateProblemDto,@Request() request: any){
        const userId = request.user.id;
        return this.problemsService.create(problemDto,userId);
    }

    @Get()
    @ApiOperation({
        summary: 'Retrieve All Problem Reports With Pagination And Optional Filtering'
    })
    @ApiOkResponse({
        description: 'List Of Problems Reports And Total Count',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Problem'}},
                total: {
                    type: 'number',
                    example: 50}
            }
        }
    })
    findAll(@Query() queryDto: ProblemQueryDto){
        // Convert string parameters to numbers for the service 
        const page = parseInt(queryDto.page || '1',10);
        const limit = parseInt(queryDto.limit || '10',10);
        const sectionId = queryDto.sectionId ? parseInt(queryDto.sectionId, 10) : undefined;
        const stateId = queryDto.stateId ? parseInt(queryDto.stateId, 10) : undefined;

        return this.problemsService.findAll(page,limit,sectionId,stateId);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a Single Problem Report By ID'
    })
    @ApiResponse({
        status: 200,
        description: 'The Problem report',
        type: Problem
    })
    @ApiNotFoundResponse({
        description: 'Problem Not Found'
    })
    findOne(@Param('id',ParseIntPipe)id: number){
        return this.problemsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard,ProblemOwnerOrAdminGuard)
    @ApiOperation({
        summary: 'Update an Existing Problem Report (Owner or Admin Only)'
    })
    @ApiResponse({
        status: 200,
        description: 'Problem updated Successfully',
        type: Problem
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Is Not The Creator Or An Admin)'
    })
    @ApiNotFoundResponse({
        description: 'Problem Not Found'
    })
    update(
        @Param('id',ParseIntPipe)id: number,
        @Body()problemDto:UpdateProblemDto,
        @Req()request:any
    ){
        const currentUserId = request.user.id;
        const currentUserRole = request.user.role;
        return this.problemsService.update(id,problemDto,currentUserId,currentUserRole); 
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Delete a Problem Report'
    })
    @ApiResponse({
        status: 200,
        description: 'Problem Deleted Successfully'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Is Not The Creator Or An Admin)'
    })
    @ApiNotFoundResponse({
        description: 'Problem Not found'
    })
    remove(@Param('id',ParseIntPipe)id: number){
        return this.problemsService.remove(id);
    }
    
}