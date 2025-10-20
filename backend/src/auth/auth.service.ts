import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    BadRequestException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UsersService } from '../users/users.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { ChangePasswordDto } from './dto/change-password.dto';
  import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';

const SALT_ROUNDS = 12;

type AuthResponse = {

  user: Partial<User>;
  access_token: string;
}

  @Injectable()
  export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}


    // function to generate JWT token
    private _generateToken(user: User): string {
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role
      };
      return this.jwtService.sign(payload);
    }


    // 1- register()
    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        const { email, password, name, role } = registerDto;
    
        // Check if user already exists
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create user
        const user = await this.usersService.create({
          email,
          name,
          password: hashedPassword,
          role,
          username: ''
        });
    
        // Generate JWT token
        const access_token = this._generateToken(user);
    
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
    
        return {
          user: userWithoutPassword,
          access_token,
        };
      }

    // 2- login()
    async login(loginDto: LoginDto): Promise<AuthResponse> {
      const { email, password } = loginDto;
  
      // Find user by email
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      // Generate JWT token
      const access_token = this._generateToken(user);
  
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
  
      return {
        user: userWithoutPassword,
        access_token,
      };
    }

    // 3- changePassword()
    async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
        const { currentPassword, newPassword } = changePasswordDto;
    
        // Find user
        const user = await this.usersService.findById(userId);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
    
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
          throw new BadRequestException('Current password is incorrect');
        }
    
        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    
        // Update password
        await this.usersService.updatePassword(userId, hashedNewPassword);
    
        return { message: 'Password changed successfully' };
      }

  }