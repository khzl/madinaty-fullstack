import { Module , forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { Notification } from "./entities/notification.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: 
    [
        // Register Only Primary Entity
        TypeOrmModule.forFeature([Notification]),
        // import foreign entity 
        forwardRef(() => UsersModule),
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService],
    exports: [NotificationsService],
})

export class NotificationsModule {}