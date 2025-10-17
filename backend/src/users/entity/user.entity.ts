import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Problem } from "src/problems/entities/problem.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { ProblemState } from "src/problem-states/entities/problem-state.entity";


// Define the UserRole enum
export enum UserRole {
    CITIZEN = 'citizen',
    GOVERNMENT = 'government',
}

@Entity('users')
export class User {

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
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CITIZEN
    })
    role: UserRole;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @OneToMany(() => Problem , problem => problem.reporter)
    problems: Problem[];

    @OneToMany(() => Vote , vote => vote.user)
    votes: Vote[];

    @OneToMany(() => Donation , donation => donation.user)
    donations: Donation[];

    @OneToMany(() => ProblemState, problemState => problemState.solved_by)
    solvedProblems: ProblemState[]; 
}