import { IsString, IsEmail , MinLength,IsOptional,IsEnum, Min, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../entity/user.entity";


export class CreateUserDto{

    @ApiProperty({
        description: 'Full Name Of The User',
        example: 'Khazaal Emad'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'URL of The User\'s profile picture',
        required: false,
        example: 'http://example.com/pic.png'
    })
    @IsOptional()
    @IsString()
    profile_picture?: string;

    @ApiProperty({
        description: 'Unique username',
        example: 'Khazaal Emad'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Unique email address',
        example: 'Khazaal34@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password (min 6 characters)',
        minLength: 6
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'User role',
        enum: UserRole,
        default: UserRole.CITIZEN,
        required: false
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}