import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Section } from 'src/sections/entities/section.entity';
import { User } from 'src/users/entity/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { ProblemState } from 'src/problem-states/entities/problem-state.entity';

@Entity('problems')
export class Problem {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    body: string;

    @Column({nullable: true})
    picture: string;

    @Column({nullable: true})
    location_name: string;

    @Column({nullable: true})
    location_map: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Section , section => section.problems)
    section: Section;

    @ManyToOne(() => User , user => user.problems)
    reporter: User;

    @OneToMany(() => Vote , vote => vote.problem)
    votes: Vote[];

    @OneToMany(() => Donation , donation => donation.problem)
    donations: Donation[];

    @OneToMany(() => ProblemState , problemState => problemState.problem)
    problemStates: ProblemState[];
    
}