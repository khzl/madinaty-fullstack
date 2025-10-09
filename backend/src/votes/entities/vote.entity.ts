import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('votes')
export class Vote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Problem , problem => problem.votes)
    problem: Problem;

    @ManyToOne(() => User , user => user.votes)
    user: User;
}