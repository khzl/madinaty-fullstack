import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
    CreateDateColumn,UpdateDateColumn,Index,
    JoinColumn,
} from 'typeorm';
import { Section } from 'src/sections/entities/section.entity';
import { User } from 'src/users/entity/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { ProblemState } from 'src/problem-states/entities/problem-state.entity';
import { ProblemStatusHistory } from 'src/problem-status-History/entities/problem-status-history.entity';

@Entity('problems')
@Index(['section_id','state_id','created_at'])
export class Problem {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 255})
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 512,
        name: 'image_url'
    })
    imageUrl: string;

    @Column({
        nullable: true,
        length: 255,
        name: 'location_name'
    })
    location_name: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
        name: 'location_map'
    })
    location_map: string;

    @Column({
        type: 'int',
        default: 0,
        name: 'net_votes'
    })
    net_votes: number;
    
    @CreateDateColumn({type : 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @Column()
    section_id: number;

    @ManyToOne(() => Section , section => section.problems, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'section_id'})
    section: Section;

    @Column()
    user_id: number;

    @ManyToOne(() => User , user => user.problems,{
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'user_id'})
    createdBy: User;

    @OneToMany(() => Vote , vote => vote.problem)
    votes: Vote[];

    @OneToMany(() => Donation , donation => donation.problem)
    donations: Donation[];

    @Column({nullable: true})
    state_id: number;

    @ManyToOne(() => ProblemState , state => state.problem,{
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({name: 'state_id'})
    state: ProblemState;

    @OneToMany(() => ProblemStatusHistory , history => history.problem)
    statusHistory: ProblemStatusHistory[];
}