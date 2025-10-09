import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('donations')
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Problem , problem => problem.donations)
    problem: Problem;

    @ManyToOne(() => User , user => user.donations)
    user: User;
}