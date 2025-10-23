import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    JoinColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn
 } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('donations')
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false
    })
    amount: number;

    @Column({length: 3 , default: 'IQD'})
    currency: string;

    @Column({ name: 'payment_method', default: 'Credit Card'})
    paymentMethod: string;

    @Column({nullable: true})
    message: string;

    @Column({ name: 'status', length: 20, default: 'Successful' })
    status: string; // 'Pending', 'Successful', 'Failed'  
    
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp', name: 'deleted_at', nullable: true})
    deletedAt: Date;

    // foreign key 
    @Column({name: 'user_id'})
    user_id: number;

    @Column({name: 'problem_id' , nullable: true})
    problem_id?: number;

    @ManyToOne(() => Problem , problem => problem.donations, {
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: 'problem_id'})
    problem: Problem;

    @ManyToOne(() => User , user => user.donations , {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'user_id'})
    donor: User;

}