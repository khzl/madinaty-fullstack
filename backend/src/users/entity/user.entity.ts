import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,
    CreateDateColumn,UpdateDateColumn,
    BaseEntity
} from 'typeorm';
import { Problem } from "src/problems/entities/problem.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { ProblemStatusHistory } from 'src/problem-status-History/entities/problem-status-history.entity';
import { ProblemState } from 'src/problem-states/entities/problem-state.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Exclude } from 'class-transformer';
// Define the UserRole enum
export enum UserRole {
    CITIZEN = 'citizen',
    GOVERNMENT = 'government',
    ADMIN = 'admin'
}

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    

    @Column({nullable: true})
    profile_picture: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CITIZEN
    })
    role: UserRole;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Problem , problem => problem.createdBy)
    problems: Problem[];

    @OneToMany(() => Vote , vote => vote.user)
    votes: Vote[];

    @OneToMany(() => Donation , donation => donation.donor)
    donations: Donation[];

    @OneToMany(() => ProblemStatusHistory, history => history.changedBy)
    statusChanges: ProblemStatusHistory[];
    
    @OneToMany(() => Notification , notification => notification.user)
    notifications: Notification[];

    @OneToMany(() => ProblemState , state => state.solver)
    solvedStates: ProblemState[];
}