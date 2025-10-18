import { Controller,Get,Post,
    Body,Patch,Param,Delete,UseGuards,ParseIntPipe,Req,Query
 } from "@nestjs/common";
import { ApiTags,
    ApiOperation,ApiResponse,ApiBearerAuth,ApiUnauthorizedResponse,
    ApiNotFoundResponse,ApiBadRequestResponse,ApiCreatedResponse,
    ApiOkResponse,ApiQuery,
    ApiForbiddenResponse,
 } from "@nestjs/swagger";
import { VotesService } from "./votes.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UpdateVoteDto } from "./dto/update-vote.dto";
import { Vote } from "./entities/vote.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { VoteQueryDto } from "./dto/vote-query.dto";

@ApiTags('votes')
@ApiBearerAuth()
@Controller('votes')
export class VotesController {
    constructor(private readonly votesService: VotesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Create a New Vote Or Update an Existing One'
    })
    @ApiCreatedResponse({
        description: 'Vote Created Or Updated Successfully',
        type: Vote,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized (Missing Or Invalid Token)'
    })
    create(
        @Body()voteDto: CreateVoteDto,
        @Req()request: any
    ){
        const userId = request.user.id;
        return this.votesService.create(voteDto,userId);
    }


    @Get()
    @ApiOperation({
        summary: 'Retrieve All Votes With optional Filters (e.g... By Problem'
    })
    @ApiOkResponse({
        description: 'List Of Paginated votes..',
        type: [Vote]
    })
    findAll(@Query() queryDto: VoteQueryDto){
        const page = parseInt(queryDto.page || '1', 10);
        const limit = parseInt(queryDto.limit || '10', 10);
        const problemId = queryDto.problemId ? parseInt(queryDto.problemId , 10) : undefined;
        const userId = queryDto.userId ? parseInt(queryDto.userId, 10) : undefined;

        return this.votesService.findAll(page,limit,problemId,userId);
    }


    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a Single Vote By ID'
    })
    @ApiResponse({
        status: 200,
        description: 'The Vote Object...',
        type: Vote
    })
    @ApiNotFoundResponse({
        description: 'Vote Not Found..'
    })
    findOne(@Param('id',ParseIntPipe)id: number){
        return this.votesService.findOne(id);
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Update an existing Vote (e.g., Change UpVote To DownVote)'
    })
    @ApiResponse({
        status: 200,
        description: 'Vote Updated Successfully',
        type: Vote
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Is Not The Owner Of The Vote)'
    })
    @ApiNotFoundResponse({
        description: 'Vote Not Found'
    })
    update(
        @Param('id',ParseIntPipe)id: number,
        @Body()voteDto: UpdateVoteDto,
        @Req()request: any
    ){
        const currentUserId = request.user.id;
        return this.votesService.update(id,voteDto,currentUserId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Delete Vote (unVoting)'
    })
    @ApiResponse({
        status: 200,
        description: 'Vote Deleted Successfully'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (User Is Not The Owner Of The Vote)'
    })
    @ApiNotFoundResponse({
        description: 'Vote Not Found'
    })
    remove(@Param('id',ParseIntPipe)id: number,@Req()request: any){
        const currentUserId = request.user.id;
        return this.votesService.remove(id,currentUserId);
    }

    
}