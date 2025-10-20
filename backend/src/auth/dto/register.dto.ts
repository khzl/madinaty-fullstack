import { IsEmail, IsString, MinLength, IsEnum, IsOptional,Matches, maxLength, MaxLength } from 'class-validator';
import { UserRole } from 'src/users/entity/user.entity';  
import { ApiProperty } from '@nestjs/swagger';

const MAX_STRING_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 8;
export class RegisterDto {

    @ApiProperty({
    description: 'Email address of the new user',
    example: 'newuser@example.com',
    format: 'email',
    maxLength: MAX_STRING_LENGTH,
    })
    @IsEmail()
    @MaxLength(MAX_STRING_LENGTH)
    email: string;
  
    @ApiProperty({
    description: 'Full name of the new user',
    example: 'John Doe',
    minLength: 2,
    maxLength: MAX_STRING_LENGTH,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(MAX_STRING_LENGTH)
    name: string;
  
    @ApiProperty({
    description: 'Password for the new user. Must be at least 8 characters and contain at least one number, one uppercase, and one special character.',
    example: 'SecurePass123!',
    minLength: PASSWORD_MIN_LENGTH,
    })
    @IsString()
    @MinLength(PASSWORD_MIN_LENGTH , {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    })
    password: string;
  
    @ApiProperty({
    description: 'Role of the new user (defaults to CITIZEN). Only used if registration endpoint allows role selection.',
    enum: UserRole,
    example: UserRole.CITIZEN,
    required: false,
    })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole = UserRole.CITIZEN;

}