import { Injectable,NotFoundException,
    ConflictException, BadRequestException
 } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, IsNull } from 'typeorm';
import { ProblemState } from "./entities/problem-state.entity";
import { CreateProblemStateDto } from "./dto/create-problem-state.dto";
import { UpdateProblemStateDto } from "./dto/update-problem-state.dto";

@Injectable()
export class ProblemStatesService {
    constructor(
        @InjectRepository(ProblemState)
        private readonly stateRepo: Repository<ProblemState>,
    ) {}

    // create state
    async create(stateDto: CreateProblemStateDto): Promise<ProblemState>{

        const existingState = await this.stateRepo.findOne({
            where: {name : stateDto.name}
        });

        if (existingState){
            throw new ConflictException(`Problem State With Name "${stateDto.name}" Already Exists`);
        }

        const state = this.stateRepo.create(stateDto);
        return this.stateRepo.save(state);
    }

    // Find All States
    async findAll(): Promise<ProblemState[]>{
        
        return this.stateRepo.find({
            order: {name: 'ASC'}
        });

    }

    // find One State
    async findOne(id: number): Promise<ProblemState>{
        
        const state = await this.stateRepo.findOne({
            where: {id},
            relations: ['problems'],
        });

        if (!state)
            throw new NotFoundException(`Problem State With ID ${id} Not Found`);

        return state;

    }

    // update state 
    async update(
        id: number,
        stateDto: UpdateProblemStateDto,
        currentUserId: number
    ): Promise<ProblemState>{

        const state = await this.findOne(id);

        if (stateDto.name && stateDto.name !== state.name){

            const conflict = await this.stateRepo.findOne({
                where: {
                    name: stateDto.name,
                    id: Not(id)
                }
            });

            if (conflict){
                throw new ConflictException(`Cannot rename: state With Name "${stateDto.name}" Already exists`);
            }
        }

        Object.assign(state,stateDto);

        if (stateDto.name && (stateDto.name.toLowerCase() === 'solved' || stateDto.name.toLowerCase() === 'closed')) {
            state.solverUserId = currentUserId;
        } else if (stateDto.name && stateDto.name.toLowerCase() !== state.name.toLowerCase()) {
            state.solverUserId = null; 
        }
        
        return this.stateRepo.save(state);
    }

    // remove state
    async remove(id: number): Promise<void>{

        const state = await this.findOne(id);

        const problemsCount = await this.stateRepo
        .createQueryBuilder('state')
        .leftJoin('state.problems','problem')
        .where('state.id = :id', {id})
        .getCount();

        if(problemsCount > 0){
            throw new BadRequestException(
                `Cannot Delete State "${state.name}" . ${problemsCount} problem(s) are currently linked to it`,
            );
        }

        await this.stateRepo.remove(state);
    }
    
}