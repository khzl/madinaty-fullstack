import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    OneToMany,CreateDateColumn,UpdateDateColumn
 } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';

@Entity('problem_states')
export class ProblemState {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({type: 'timestamp', name: 'created_at'})
    created_at: Date;

    @Column({type: 'timestamp', name: 'updated_at'})
    updated_at: Date;

    @OneToMany(() => Problem , Problem => Problem.state)
    problem: Problem[];

}