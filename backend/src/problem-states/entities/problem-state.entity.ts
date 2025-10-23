import { Entity, PrimaryGeneratedColumn, Column,
    OneToMany,CreateDateColumn,UpdateDateColumn, ManyToOne , JoinColumn
 } from 'typeorm';
 import { User } from 'src/users/entity/user.entity';
import { Problem } from '../../problems/entities/problem.entity';
import { ProblemStatusHistory } from 'src/problem-status-History/entities/problem-status-history.entity';
@Entity('problem_states')
export class ProblemState {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @Column({ nullable: true , name: 'solver_user_id'})
    solverUserId: number | null;

    @ManyToOne(() => User, user => user.solvedStates, {
        onDelete: 'SET NULL', 
        nullable: true,
    })
    @JoinColumn({ name: 'solver_user_id' })
    solver: User;

    @OneToMany(() => Problem , Problem => Problem.state)
    problem: Problem[];

    @OneToMany(() => ProblemStatusHistory , history => history.oldState)
    oldStatusHistory: ProblemStatusHistory[];

    @OneToMany(() => ProblemStatusHistory , history => history.newState)
    newStatusHistory: ProblemStatusHistory[];
    
}