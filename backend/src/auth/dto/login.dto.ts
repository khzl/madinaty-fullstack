// dto/login.dto.ts
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const MAX_STRING_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 8; 
export class LoginDto {

    @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    format: 'email',
    maxLength: MAX_STRING_LENGTH,
    })
    @IsEmail()
    @MaxLength(MAX_STRING_LENGTH)
    email: string;
  
    @ApiProperty({
    description: 'Password of the user',
    example: 'securePass123',
    minLength: PASSWORD_MIN_LENGTH,
    })
    @IsString()
    @MinLength(PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    })
    password: string;
}