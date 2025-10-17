import { Injectable,
    NotFoundException, BadRequestException,
    ForbiddenException
 } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, Not, FindManyOptions } from 'typeorm';
import { Problem } from "./entities/problem.entity";
import { CreateProblemDto } from "./dto/create-problem.dto";
import { UpdateProblemDto } from "./dto/update-problem.dto";
import { ProblemState } from "src/problem-states/entities/problem-state.entity";
import { Section } from "src/sections/entities/section.entity";
import { UserRole } from "src/users/entity/user.entity";


 type PaginatedProblems = {
    data: Problem[];
    total: number;
    page: number;
    limit: number;
 };

@Injectable()
export class ProblemsService {

    // get the default state id
    private readonly DEFAULT_STATE_ID = 1;


    constructor(
        @InjectRepository(Problem)
        private readonly problemRepo: Repository<Problem>,

        @InjectRepository(ProblemState)
        private readonly problemStateRepo : Repository<ProblemState>,

        @InjectRepository(Section)
        private readonly sectionRepo: Repository<Section>,
    ) {}

    
    // create problem 
    async create(problemDto: CreateProblemDto, userId: number): Promise<Problem>{

        const StateId = problemDto.stateId || this.DEFAULT_STATE_ID;

        try {
        const newProblem = this.problemRepo.create({
            ...problemDto,
            user_id: userId,
            state_id: StateId,
        });
        return this.problemRepo.save(newProblem);        
    }

    catch(error)
    {
        throw error;
    }
    }

    // find all problems
    async findAll(
        page: number = 1,
        limit: number = 10,
        sectionId?: number,
        stateId?: number,
    ): Promise<PaginatedProblems>{

        const skip = (page - 1) * limit;

        const where: FindManyOptions<Problem>['where'] = {};

        if (sectionId){
            where['section_id'] = sectionId;
        }

        if (stateId){
            where['state_id'] = stateId;
        }

        const [problems,total] = await this.problemRepo.findAndCount({
            where: where,
            relations: ['section','categoryBy','state','votes','donations'],
            order: {created_at: 'DESC'},
            take: limit,
            skip: skip,
        });

        // return paginated structure
        return {
            data: problems,
            total: total,
            page: page,
            limit: limit,
        };
    }

    // find One Problem 
    async findOne(id: number): Promise<Problem>{

        const newProblem = await this.problemRepo.findOne({
            where: {id},
            relations: ['section','createdBy','state','votes','donations'],
        });

        if (!newProblem)
            throw new NotFoundException(`Problem With Id ${id} Not Found`);

        return newProblem;
    }

    // update problem 
    async update(
        id: number,
        problemDto: UpdateProblemDto,
        currentUserId: number,
        currentUserRole: UserRole
    ): Promise<Problem>{

        const newProblem = await this.findOne(id);

        if (problemDto.stateId !== undefined && problemDto.stateId !== null){

            if (currentUserRole !== UserRole.GOVERNMENT){
                throw new ForbiddenException('Only Administrators Can Change The Problem Status (stateId)');
            }

            const state = await this.problemStateRepo.findOne({
                where: {id: problemDto.stateId }
            });

            if(!state){
                throw new NotFoundException(`Problem State With ID ${problemDto.stateId} Not found`);
            }

            newProblem.state_id = problemDto.stateId;
            delete problemDto.stateId;
        }

        if(problemDto.sectionId !== undefined && problemDto.sectionId !== null){

            if(currentUserRole !== UserRole.GOVERNMENT){
                throw new ForbiddenException('Only Administrators Can Change The Section Category (SectionId');
            }

            const section = await this.sectionRepo.findOne({
            where: {id: problemDto.sectionId}
            });

            if (!section){
            throw new NotFoundException('New Section Not Found');
            }
            newProblem.section_id = problemDto.sectionId;
            delete problemDto.sectionId;
        }

        if ('userId' in problemDto){
            throw new BadRequestException('Cannot Change The Creator Of The Problem');
        }

        Object.assign(newProblem,problemDto);
        return this.problemRepo.save(newProblem);
    }

    // remove Problem 
    async remove(id: number): Promise<void>{
        const newProblem = await this.findOne(id);
        await this.problemRepo.remove(newProblem);
    }


}