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
}
from "@nestjs/common";
import { 
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse,
    ApiParam, 
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
        summary: 'Create a new User (Registration)'
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
        return this.usersService.create(userDto);
    }

    // 2- find All 
    @Get()
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @Roles(UserRole.GOVERNMENT)
    @ApiOperation({
        summary: 'Retrieve All Users'
    })
    @ApiResponse({
        status: 200,
        description: 'List Of All Users',
        type: [User]
    })
    @ApiForbiddenResponse({
        description: 'Forbidden (Requires Government Role)'
    })
    findAll(){
        return this.usersService.findAll();
    }

    // 3- find user by id - Owner or admin only
    @Get(':id')
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @ApiOperation({
        summary: 'Retrieve a User By Id'
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
        summary: 'Update a User Record By Id'
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
        @Body() userDto: UpdateUserDto)
    {
        return this.usersService.update(targetUserId,userDto);
    }

    // 5- delete user - owner or admin only 
    @Delete(':id')
    @UseGuards(JwtAuthGuard,OwnerOrAdminGuard)
    @ApiOperation({
        summary: 'Delete a User by Id'
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
    @ApiResponse({
        status: 404,
        description: 'User Not Found'
    })
    remove(@Param('id', ParseIntPipe) targetUserId: number){
        return this.usersService.remove(targetUserId);
    }
}