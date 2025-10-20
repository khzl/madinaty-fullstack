import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn, 
    CreateDateColumn 
} from 'typeorm';
import { Problem } from 'src/problems/entities/problem.entity';
import { ProblemState } from 'src/problem-states/entities/problem-state.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('problem_status_history')
export class ProblemStatusHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    problem_id: number;

    @Column({nullable: true})
    old_status_id: number;

    @Column()
    new_status_id: number;

    @Column()
    changed_by_id: number;

    @ManyToOne(() => Problem , problem => problem.statusHistory, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({name: 'problem_id'})
    problem: Problem;

    @ManyToOne(() => ProblemState , state => state.oldStatusHistory , {
        nullable: true
    })
    @JoinColumn({name: 'old_status_id'})
    oldState: ProblemState;

    @ManyToOne(() => ProblemState , state => state.newStatusHistory , {
        nullable: false
    })
    @JoinColumn({name: 'new_status_id'})
    newState: ProblemState;

    @ManyToOne(() => User ,  user => user.statusChanges , {
        nullable: false
    })
    @JoinColumn({name: 'changed_by_id'})
    changedBy: User;

    @CreateDateColumn({type: 'timestamp', name: 'changed_at'})
    changedAt: Date;
    
}