import { Injectable, NotFoundException,ConflictException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from 'typeorm';
import { Vote } from "./entities/vote.entity";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UpdateVoteDto } from "./dto/update-vote.dto";
import { Problem } from "src/problems/entities/problem.entity";

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

        @InjectRepository(Problem)
        private readonly problemRepo: Repository<Problem>,

    ){}

    private async updateProblemNetVotes(
        problemId: number,
        queryRunner?: QueryRunner
    ) : Promise<void> {
        const votesRepo = queryRunner ? queryRunner.manager.getRepository(Vote) : this.voteRepo;
        const problemRepo = queryRunner ? queryRunner.manager.getRepository(Problem) : this.problemRepo;

        const result = await votesRepo
        .createQueryBuilder("vote")
        .select("SUM(CASE WHEN vote.is_upvote = true THEN 1 ELSE 0 END)" , "upVotes")
        .addSelect("SUM(CASE WHEN vote.is_upvote = false THEN 1 ELSE 0 END)", "downVotes")
        .where("vote.problem_id = :problemId", {problemId})
        .getRawOne();

        const upVotes = parseInt(result.upVotes || '0',10);
        const downVotes = parseInt(result.downVotes || '0',10);
        const netVotes = upVotes - downVotes;

        await problemRepo.update(problemId, { net_votes: netVotes });
    }

    // create votes
    async create(voteDto: CreateVoteDto, userId: number): Promise<Vote>{
        const queryRunner = this.voteRepo.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let vote: Vote;
            const problemId = voteDto.problem_id;

            const existingVote = await queryRunner.manager.findOne(Vote, {
                where: { user_id: userId, problem_id: problemId },
            });

            if (existingVote){
                if (existingVote.IsUpvote !== voteDto.IsUpvote){
                    existingVote.IsUpvote = voteDto.IsUpvote;
                    vote = await queryRunner.manager.save(existingVote);
                }
                else
                {
                    await queryRunner.commitTransaction();
                    return existingVote;
                }
            }
            else {
                const newVote = queryRunner.manager.create(Vote , {
                    ...voteDto,
                    user_id: userId,
                });

                vote = await queryRunner.manager.save(newVote);
            }

            await this.updateProblemNetVotes(problemId,queryRunner);
            await queryRunner.commitTransaction();
            return vote;
        }
        catch(error){
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally{
            await queryRunner.release();
        }
    }

    // update vote
    async update(
        id: number,
        voteDto: UpdateVoteDto,
        currentUserId: number
    ): Promise<Vote>{
        const queryRunner = this.voteRepo.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const vote = await queryRunner.manager.findOne(Vote , { 
                where: {id}
            });

            if (!vote){
                throw new NotFoundException(`Vote With ID ${id} not Found`);
            }

            if (vote.user_id !== currentUserId) {
                throw new ForbiddenException('You Can Only Update Your Own Vote..');
            }

            if (voteDto.IsUpvote !== undefined && vote.IsUpvote !== voteDto.IsUpvote) {
                
                vote.IsUpvote = voteDto.IsUpvote;

                const updatedVote = await queryRunner.manager.save(vote);
                
                await this.updateProblemNetVotes(vote.problem_id, queryRunner);

                await queryRunner.commitTransaction();
                return updatedVote;
            }
            
            await queryRunner.commitTransaction();
            return vote;
        }
        catch(error){
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally{
            await queryRunner.release();
        }
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

       const queryRunner = this.voteRepo.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const vote = await queryRunner.manager.findOne(Vote, { 
                where: { id } 
            });

            if (!vote) {
                throw new NotFoundException(`Vote With ID ${id} Not Found`);
            }

            if(vote.user_id !== currentUserId){
                throw new ForbiddenException('You Do Not Have Permission To Remove this Vote');
            }

            const problemId = vote.problem_id;

            const deleteResult = await queryRunner.manager.delete(Vote, id);

            if(deleteResult.affected === 0){
                throw new NotFoundException(`Vote With ID ${id} Not Found`);
            }

            await this.updateProblemNetVotes(problemId, queryRunner);

            await queryRunner.commitTransaction();

        } catch(error) {

            await queryRunner.rollbackTransaction();
            throw error;

        } finally {

            await queryRunner.release();

        }
    }
    
}