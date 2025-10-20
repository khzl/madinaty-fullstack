import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    CreateDateColumn,Unique,
    JoinColumn,
    UpdateDateColumn,
 } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('votes')
@Unique(['user_id','problem_id']) // ensure a user can only vote once per problem
export class Vote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: true, name: 'is_upvote'})
    IsUpvote: boolean;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    // explicit foreign keys
    @Column()
    user_id: number;

    @Column()
    problem_id: number;

    @ManyToOne(() => Problem , problem => problem.votes,{
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'problem_id'})
    problem: Problem;

    @ManyToOne(() => User , user => user.votes, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'user_id'})
    user: User;
}