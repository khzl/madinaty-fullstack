import { Request, Body, Post, UseGuards,
    Controller,Get,Patch,Param,Delete,ParseIntPipe,Query,Req,
    HttpCode,
    HttpStatus
 } from "@nestjs/common";
import { ApiTags,ApiOperation,ApiResponse,
    ApiBearerAuth,ApiBody,ApiUnauthorizedResponse,
    ApiForbiddenResponse,ApiNotFoundResponse,
    ApiBadRequestResponse,ApiOkResponse,ApiQuery,
    ApiParam
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

interface AuthenticatedRequest extends Request {
    user: { id: number , role: UserRole }
}

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
    create(@Body() problemDto: CreateProblemDto,@Request() request: AuthenticatedRequest){
        const userId = request.user.id;
        return this.problemsService.create(problemDto,userId);
    }

    @Get()
    @ApiOperation({
         summary: 'Retrieve all problems with pagination, filtering by section/state, and search by title.' 
    })
    @ApiQuery({ 
        name: 'page',
        required: false, 
        type: Number,
        description: 'Page number (default: 1)' 
    })
    @ApiQuery({ 
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)' 
    })
    @ApiQuery({ 
        name: 'sectionId',
        required: false,
        type: Number,
        description: 'Filter problems by section ID.' 
    })
    @ApiQuery({ 
        name: 'stateId',
        required: false,
        type: Number,
        description: 'Filter problems by problem state ID.' 
    })
    @ApiQuery({ 
        name: 'searchTerm',
        required: false,
        type: String,
        description: 'Search term applied to the problem title (case-insensitive).' 
    })
    @ApiResponse({ 
        status: 200,
        description: 'List of problems and pagination data.' 
    })
    findAll(
        @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
        @Query('sectionId', new ParseIntPipe({ optional: true })) sectionId?: number,
        @Query('stateId', new ParseIntPipe({ optional: true })) stateId?: number,
        @Query('searchTerm') searchTerm?: string,
    ){
        return this.problemsService.findAll(page,limit,sectionId,stateId,searchTerm);
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
        @Req()request:AuthenticatedRequest
    ){
        const currentUserId = request.user.id;
        const currentUserRole = request.user.role;
        return this.problemsService.update(id,problemDto,currentUserId,currentUserRole); 
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a Problem Report'
    })
    @ApiParam({
        name: 'id',
        type: Number
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
    remove(@Param('id',ParseIntPipe)id: number, @Req() request: AuthenticatedRequest){
        const userId = request.user.id;
        const userRole = request.user.role;
        return this.problemsService.remove(id,userId,userRole);
    }
    
}