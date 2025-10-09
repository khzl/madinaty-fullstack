import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';

@Entity('sections')
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @Column({nullable: true})
    picture: string;

    @Column({nullable: true})
    description: string;

    @ManyToOne(() => Section , section => section.children ,{
        nullable: true
    })
    parent_section: Section[];

    @OneToMany(() => Section , section => section.parent_section)
    children: Section[];

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @OneToMany(() => Problem , problem => problem.section)
    problems: Problem[];
}