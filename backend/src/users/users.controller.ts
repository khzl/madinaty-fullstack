import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    ParseIntPipe,
    UseGuards, 
    Req,
    HttpStatus,
    HttpCode,
    BadRequestException,
    Query,
}
from "@nestjs/common";
import 'multer';
import { 
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse,
    ApiQuery,
    ApiOkResponse,
    ApiParam,
    ApiNotFoundResponse, 
}
from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entity/user.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "./entity/user.entity";
import { OwnerOrAdminGuard } from "src/auth/guards/owner-or-admin.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import type { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Unauthorized (Missing or Invalid Token)'
})
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // 1- create user (Registration)
    @Post()
    @ApiOperation({
        summary: 'Create a new User (public Registration)',
        description: 'New users are created with the CITIZEN role by default.'
    })
    @ApiBody({
        type: CreateUserDto
    })
    @ApiResponse({
        status: 201,
        description: 'User created Successfully.',
        type: User
    })
    @ApiResponse({
        status: 409,
        description: 'User With The Email Already exists.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation Failed'
    })
    create(@Body() userDto: CreateUserDto){
        return this.usersService.create(userDto,false);
    }

    // 2- find All 
    @Get()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.GOVERNMENT,UserRole.ADMIN)
    @ApiOperation({
        summary: 'Retrieve all Users (ADMIN/GOVERNMENT required)',
        description: 'Returns a paginated list of all user records.'
    })
    @ApiQuery({ 
        name: 'page',
        required: false,
        type: Number,
        example: 1 
    })
    @ApiQuery({ 
        name: 'limit',
        required: false,
        type: Number,
        example: 10 
    })
    @ApiResponse({
        status: 200,
        description: 'List Of All Users',
        type: [User]
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Requires Government Role)'
    })
    findAll(
        @Query('page', new ParseIntPipe({optional: true})) page: number = 1,
        @Query('limit', new ParseIntPipe({optional: true})) limit: number = 10,
    ){
        return this.usersService.findAll(page,limit);
    }

    // 3- find user by id - Owner or admin only
    @Get(':id')
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @ApiOperation({
        summary: 'Retrieve a User by ID (Owner or Admin/Government required)',
        description: 'Allows users to view their own profile or an Admin/Government to view any profile.'
    })
    @ApiParam({
        name: 'id',
        description: 'The ID Of The User',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'The User Record',
        type: User
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Not Found Owner Or Admin)'
    })
    @ApiResponse({
        status: 404,
        description: 'User Not Found'
    })
    findOne(@Param('id',ParseIntPipe) targetUserId: number){
        return this.usersService.findById(targetUserId);
    }
    // 4- update Users - Owner or Admin only 
    @Patch(':id')
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @ApiOperation({
        summary: 'Update a User Record by ID (Owner or Admin/Government required)',
        description: 'Allows a user to update their own non-sensitive details or an Admin to update any user\'s record.'
    })
    @ApiParam({
        name: 'id',
        description: 'The ID Of The User to Update',
        type: Number
    })
    @ApiBody({
        type: UpdateUserDto
    })
    @ApiResponse({
        status: 200,
        description: 'The Updated User Record',
        type: User
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Not Owner or Admin)'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid Data Provided or Attempt to Change Password'
    })
    @ApiResponse({
        status: 404,
        description: 'User Not Found'
    })
    update(
        @Param('id',ParseIntPipe) targetUserId: number,
        @Body() userDto: UpdateUserDto,
        @Req()  request: Request
    )
    {
        const userId = (request.user as any)?.id;
        if (typeof userId !== 'number') {
            throw new BadRequestException('Authenticated user id not found');
        }
        return this.usersService.update(targetUserId,userDto,userId);
    }

    // 5- delete user - owner or admin only 
    @Delete(':id')
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a User by ID (Owner or Admin/Government required)',
        description: 'Permanently deletes a user record. Use with caution.'
    })
    @ApiParam({
        name: 'id',
        description: 'The Id Of The USer To Delete',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'User Deleted Successfully'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Not Owner Or Admin)'
    })
    @ApiNotFoundResponse({
        description: 'User Not Found'
    })
    remove(@Param('id', ParseIntPipe) targetUserId: number){
        return this.usersService.remove(targetUserId);
    }

    @Patch('profile') 
    @UseGuards(JwtAuthGuard) 
    @UseInterceptors(FileInterceptor('profile_picture'))
    @ApiOperation({
        summary: 'Update the Current User\'s Profile and Upload Picture',
        description: 'Updates partial user data and optionally uploads a new profile picture. Note: Password/Role cannot be changed here.'
    })
    @ApiBody({
        type: UpdateUserDto,
        description: 'Partial user data (name, username, email). Picture file is sent via form-data.',
    })
    @ApiOkResponse({
        description: 'Profile Updated Successfully',
        type: User
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Invalid Role/Admin only fields)'
    })
    updateProfile(
        @UploadedFile() file: any, 
        @Body() userDto: UpdateUserDto,
        @Req() request: Request 
    ) {
        const currentUserId = (request.user as any)?.id;
        if (typeof currentUserId !== 'number') {
            throw new BadRequestException('Authenticated user id not found');
        }
        if (file) {
            userDto.profile_picture = file.path; 
        }
        delete userDto.password;
        delete userDto.role; 
        return this.usersService.update(currentUserId, userDto, currentUserId);
    }
}