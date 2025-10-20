import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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
    @JoinColumn({name: 'parent_id'})
    parent_section: Section[];

    @OneToMany(() => Section , section => section.parent_section)
    children: Section[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Problem , problem => problem.section)
    problems: Problem[];
}