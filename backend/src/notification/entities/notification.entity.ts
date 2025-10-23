import { ManyToOne,JoinColumn,Column, CreateDateColumn,PrimaryGeneratedColumn,
    Entity
 } from "typeorm";
 import { User } from "src/users/entity/user.entity";

 @Entity('notifications')
 export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : 'text'})
    message: string;

    @Column({default: false, name: 'is_read'})
    isRead: boolean;

    @CreateDateColumn({type: 'timestamp'})
    create_at: Date;

    @Column({name: 'user_id'})
    userId: number;

    // Relation notification one for user one
    @ManyToOne(() => User , user => user.notifications , {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: 'user_id'})
    user: User;
 }