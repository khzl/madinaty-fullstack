// dto/change-password.dto.ts
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const PASSWORD_MIN_LENGTH = 8;

export class ChangePasswordDto {

    @ApiProperty({
    description: 'Current password of the user',
    example: 'oldPassword123!',
    minLength: PASSWORD_MIN_LENGTH,
    })
    @IsString()
    @MinLength(PASSWORD_MIN_LENGTH, {
        message: `Current password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    })
    currentPassword: string;
  
    @ApiProperty({
    description: 'New password to be set. Must be complex.',
    example: 'NewSecurePass456!',
    minLength: PASSWORD_MIN_LENGTH,
    })
    @IsString()
     @MinLength(PASSWORD_MIN_LENGTH, {
        message: `New password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    })
    newPassword: string;
    
  }