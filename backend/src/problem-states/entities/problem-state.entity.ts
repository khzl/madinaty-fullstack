import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('problem_states')
export class ProblemState {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Problem , Problem => Problem.problemStates)
    problem: Problem;

    @ManyToOne(() => User , user => user.solvedProblems)
    solved_by: User;
}