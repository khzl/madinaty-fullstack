import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class NotificationsService {

    constructor(
        @InjectRepository(Notification)
        private notificationsRepo : Repository<Notification>,

        @InjectRepository(User)
        private usersRepo : Repository<User>,
    ) {}

    async create(notificationDto: CreateNotificationDto) : Promise<Notification> {

        const { userId } = notificationDto;

        const userExists = await this.usersRepo.exists({
            where: { id : userId }
        });

        if (!userExists){
            throw  new NotFoundException(`User With UserID ${userId} Not Found`);
        }

        const notification = this.notificationsRepo.create(notificationDto);
        return this.notificationsRepo.save(notification);
    }

    async findAllForUser(userId: number) : Promise<Notification[]>{

        return this.notificationsRepo.find({
            where: {userId},
            order: {create_at: 'DESC'},
        });
    }

    async findUnreadForUser(userId: number): Promise<Notification[]>{
        return this.notificationsRepo.find({
            where: { userId , isRead: false },
            order: { create_at: 'DESC' },
        });
    }

    async markAsRead(id: number , userId: number): Promise<Notification> {

        const notification = await this.notificationsRepo.findOne({
            where : { id , userId }
        });

        if (!notification){
            throw new NotFoundException(`notification with Id ${id} is Not Found for User ${userId}`);
        }

        if (notification.isRead){
            return notification;
        }

        notification.isRead = true;
        return this.notificationsRepo.save(notification);
    }

    async update(id:number,notificationDto: UpdateNotificationDto , userId: number): Promise<Notification> {

        const notification = await this.notificationsRepo.findOne({
            where: { id , userId }
        });

        if (!notification){
            throw new NotFoundException(`notification With Id ${id} Is Not Found for User ${userId}`);
        }

        const updatedNotification = Object.assign(notification,notificationDto);
        return this.notificationsRepo.save(updatedNotification);
    }

    async remove(id:number , userId: number): Promise<void> {

        const result = await this.notificationsRepo.delete({
            id , userId
        });

        if (result.affected === 0) {
            throw new NotFoundException(`notification with userId ${id} is not found for delete by user ${userId}`);
        }
    }
    
    
}