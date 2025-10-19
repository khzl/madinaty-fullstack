import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ProblemStatusHistory } from "./entities/problem-status-history.entity";
import { CreateProblemStatusHistoryDto } from "./dto/create-problem-status-history.dto";

@Injectable()
export class ProblemStatusHistoryService {
    constructor(
        @InjectRepository(ProblemStatusHistory)
        private readonly HistoryRepo: Repository<ProblemStatusHistory>,
    ){}

    // create 
    async create(HistoryDto: CreateProblemStatusHistoryDto, changedByUserId: number): Promise<ProblemStatusHistory> {

        const history = this.HistoryRepo.create({
            ...HistoryDto,
            changed_by_id: changedByUserId,
        });

        return this.HistoryRepo.save(history);
    }

    // find All
    async FindAllForProblem(problemId: number): Promise<ProblemStatusHistory[]>{

        return this.HistoryRepo.find({
            where: {problem_id: problemId},
            relations: ['oldState','newState','changedBy'],
            order: {changedAt: 'ASC'},
        });
        
    }
}