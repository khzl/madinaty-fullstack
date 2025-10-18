import { Injectable, NotFoundException,ConflictException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Vote } from "./entities/vote.entity";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UpdateVoteDto } from "./dto/update-vote.dto";


type PaginatedVotes = {
    data: Vote[];
    total: number;
    page: number;
    limit: number;
}

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private readonly voteRepo: Repository<Vote>,

    ){}

    // create votes
    async create(voteDto: CreateVoteDto, userId: number): Promise<Vote>{

        const existingVote = await this.voteRepo.findOne({
            where: {
                user_id: userId,
                problem_id: voteDto.problem_id,
            }
        });

        if(existingVote){
            if (existingVote.IsUpvote !== voteDto.IsUpvote){
                return this.update(existingVote.id,voteDto,userId);
            }
            return existingVote;
        }

        try{
            const newVote = this.voteRepo.create({
                ...voteDto,
                user_id: userId,
            });

            return this.voteRepo.save(newVote);
        }
        catch(error){
            throw error;
        }
    }

    // update vote
    async update(
        id: number,
        voteDto: UpdateVoteDto,
        currentUserId: number
    ): Promise<Vote>{

        const vote = await this.findOne(id);

        if (vote.user_id !== currentUserId){
            throw new ForbiddenException('You Can Only Update Your Own Vote..');
        }

        if(voteDto.IsUpvote !== undefined){
            vote.IsUpvote = voteDto.IsUpvote;
        }

        return this.voteRepo.save(vote);
    }

    // find All Votes
    async findAll(
        page: number = 1,
        limit: number = 10,
        problemId?: number,
        userId?: number 
    ): Promise<PaginatedVotes>
    {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (problemId){
            where['problem_id'] = problemId;
        }

        if(userId){
            where['user_id'] = userId;
        }

        const[votes,total] = await this.voteRepo.findAndCount({
            where: where,
            relations: ['user','problem'],
            order: {created_at: 'DESC'},
            take: limit,
            skip: skip,
        });

        // return Pagination structure
        return{
            data: votes,
            total: total,
            page: page,
            limit: limit,
        };
    }

    // find One Votes
    async findOne(id: number): Promise<Vote>{
        
        const vote = await this.voteRepo.findOne({
            where: {id},
            relations: ['user','problem'],
        });

        if(!vote)
            throw new NotFoundException(`Vote With ID ${id} Not Found`);
        
        return vote;
    }

    // remove votes
    async remove(id: number,currentUserId: number): Promise<void>{

        const vote = await this.findOne(id);

        if(vote.user_id !== currentUserId){
            throw new ForbiddenException('You Do Not Have Permission To Remove this Vote');
        }

        const deleteResult = await this.voteRepo.delete(id);

        if(deleteResult.affected === 0){
            throw new NotFoundException(`Vote With ID ${id} Not Found`);
        }
    }


}