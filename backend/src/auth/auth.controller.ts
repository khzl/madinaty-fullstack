import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Patch,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { ApiTags,ApiOperation,ApiResponse,
  ApiBody,ApiBearerAuth,
 } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

// 1- register()
@Post('register')
@ApiOperation({ 
  summary: 'Register a new user' 
})
@ApiBody({ 
  type: RegisterDto
})
@ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: User,
  })
@ApiResponse({
    status: 400,
    description: 'Validation failed (e.g., invalid email, weak password)',
})
@ApiResponse({
        status: 409,
        description: 'Conflict (User with this email already exists)',
})
async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
}
  
// 2- login()
@Post('login')
@HttpCode(HttpStatus.OK)
@ApiOperation({ 
  summary: 'Login with email and password'
})
@ApiBody({ 
  type: LoginDto
})
@ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      example: {
        access_token: 'jwt.token.here',
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe',
          role: 'CITIZEN',
        },
      },
    },
})
@ApiResponse({
    status: 401,
    description: 'Invalid credentials',
})
async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
}

@Get('me')
@UseGuards(JwtAuthGuard)
@ApiOperation({ 
  summary: 'Get current user profile (requires authentication)' 
})
@ApiBearerAuth()
@ApiResponse({
        status: 200,
        description: 'Returns the authenticated user data (excluding password)',
        type: User,
})
@ApiResponse({
        status: 401,
        description: 'Unauthorized (missing or invalid JWT)',
})
async getMe(@CurrentUser() user: User) {
        return user;
    }


// 3- changePassword (Protected Route)
@UseGuards(JwtAuthGuard)
@Patch('change-password')
@ApiOperation({ 
  summary: 'Change password (requires authentication)'
})
@ApiBearerAuth()
@ApiBody({ 
  type: ChangePasswordDto
 })
  @ApiResponse({
        status: 200,
        description: 'Password successfully changed',
        schema: {
            example: { message: 'Password changed successfully' },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (e.g., current password incorrect, new password too weak or same as old one)',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized (missing or invalid JWT)',
    })
async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,) 
{
    return this.authService.changePassword(user.id, changePasswordDto);
}

}