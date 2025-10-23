import { Controller, Get, Post , Body , Patch , Param ,
    Delete , HttpCode , HttpStatus , UseGuards , Req,
    ParseIntPipe
 } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from "express";
import { ApiTags, ApiBearerAuth, ApiOperation,ApiResponse,ApiBody } from "@nestjs/swagger";

interface AuthenticatedRequest extends Request {
    user: { id : number };
}

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {

    constructor(private readonly notificationsService : NotificationsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a notification (internal / admin only)'
    })
    @ApiResponse({
        status: 201,
        description: 'The Notification has been successfully created'
    })
    create(notificationDto : CreateNotificationDto){
        
        return this.notificationsService.create(notificationDto);

    }

    @Get()
    @ApiOperation({
        summary: 'Get All Notifications For the Current Authenticated user'
    })
    @ApiResponse({
        status : 200,
        description: 'Return List Of notifications'
    })
    findAll(@Req() request: AuthenticatedRequest){

        const userId =  request.user.id;
        return this.notificationsService.findAllForUser(userId);

    }

    @Get('unread')
    @ApiOperation({
        summary: 'Get unread notifications for the current user'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns List Of unread notifications'
    })
    findAllUnread(@Req() request: AuthenticatedRequest){

        const userId = request.user.id;
        return this.notificationsService.findUnreadForUser(userId);

    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get s specific notification and mark it as read'
    })
    @ApiResponse({
        status: 200 ,
        description: 'notifications data returned and marked as read'
    })
    @ApiResponse({
        status: 404,
        description: 'notification not found or does not belong to the user'
    })
    async findOne(@Param('id', ParseIntPipe)id: number,@Req() request: AuthenticatedRequest){

        const userId = request.user.id;
        const notification = await this.notificationsService.markAsRead(id,userId);
        return notification;

    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a specific notification (e.g... , set isRead: false)'
    })
    @ApiBody({
        type: UpdateNotificationDto
    })
    @ApiResponse({
        status: 200,
        description: 'notification successfully updated'
    })
    @ApiResponse({
        status: 400 ,
        description: 'notification not found or does not belong to the user'
    })
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()notificationDto: UpdateNotificationDto,
        @Req()request: AuthenticatedRequest
    ){

        const userId = request.user.id;
        return this.notificationsService.update(id,notificationDto,userId);

    }

    @Patch(':id/read')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Explicitly mark a specific notification as read'
    })
    @ApiResponse({
        status: 200 ,
        description: 'notification marked as read'
    })
    @ApiResponse({
        status: 400,
        description: 'notification not found or does not belong to the user'
    })
    markAsRead(@Param('id',ParseIntPipe)id: number,@Req() request: AuthenticatedRequest){

        const userId = request.user.id;
        return this.notificationsService.markAsRead(id,userId);

    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a specific notification'
    })
    @ApiResponse({
        status: 204,
        description: 'notification successfully deleted'
    })
    @ApiResponse({
        status: 404,
        description: 'Notification not found or does not belong to the user'
    })
    async remove(@Param('id',ParseIntPipe)id: number,@Req() request: AuthenticatedRequest){

        const userId = request.user.id;
        await this.notificationsService.remove(id,userId);

    }

}