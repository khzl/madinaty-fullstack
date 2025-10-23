import { 
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
 } 
from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt'
import { User , UserRole } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from 'typeorm';
import { use } from "passport";


const HASH_SALT_ROUNDS = 12;
const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password,HASH_SALT_ROUNDS);
}

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly UserRepo: Repository<User>,
    ) {}

    // 1- Create a New User With Password Hash 
    async create(UserDto: CreateUserDto, isAdminCreating: boolean = false): Promise<User>{

        // check if user already exists 
        const existingUser = await this.UserRepo.findOne({
            where: {email: UserDto.email},
            select: ['id']
        });

        if (existingUser){
            throw new ConflictException('User With This Email Already Exists');
        }

        // hash password before saving
        const hashedPassword = await hashPassword(UserDto.password);

        // determine role : citizens register themselves ; admin sets role
        const role = isAdminCreating && UserDto.role ?
        UserDto.role : UserRole.CITIZEN;

        const user = this.UserRepo.create({
            ...UserDto,
            password: hashedPassword,
            role: role,
        });

        return this.UserRepo.save(user);
    }

    // 2- Find All Users 
    findAll(page: number = 1, limit: number = 10): Promise<User[]>{
        const skip = (page - 1) * limit;

        return this.UserRepo.find({
            relations: ['problems','votes','donations','statusChanges', 'notifications'],
            order: {id : 'ASC'},
            take: limit,
            skip: skip,
        });
    }

    // 3- Find a User By ID
    async findById(id: number): Promise<User>{
        const user = await this.UserRepo.findOne({
            where: {id},
            // add relation to fetch data connect user
            relations: ['problems','votes','donations','statusChanges','notifications'],
        });

        if(!user){
            throw new NotFoundException(`User With ID ${id} Not Found`);
        }

        return user;
    }

    // 4- find a User By Email 
    async findByEmail(email: string): Promise<User | null>{
        return this.UserRepo.findOne({
            where: {email},
            select: [
                'id',
                'name',
                'email',
                'role',
                'username',
                'profile_picture',
                'created_at',
                'updated_at',
                'password',
            ],
        });
    }

    // 5- update user details 
    async update(
        id: number, 
        UserDto: UpdateUserDto,
        currentUserId: number
    ): Promise<User>{

        const user = await this.findById(id);

        if (UserDto.email && UserDto.email !== user.email) {

            const existingEmail = await this.UserRepo.findOne({
                where: { email: UserDto.email },
                select: ['id']
            });

            if (existingEmail) {
                throw new ConflictException('User with this email already exists.');
            }
        }

        if (UserDto.username && UserDto.username !== user.username) {

            const existingUsername = await this.UserRepo.findOne({
                where: { username: UserDto.username },
                select: ['id']
            });

            if (existingUsername) {
                throw new ConflictException('User with this username already exists.');
            }
        }

        if (UserDto.password){
            UserDto.password = await hashPassword(UserDto.password);
        }

        const isSelfUpdate = id === currentUserId;
        const currentUser = await this.findById(currentUserId);

        if (UserDto.role && (isSelfUpdate || currentUser.role !== UserRole.ADMIN)) {
            delete UserDto.role; 
        }

        const updated = Object.assign(user,UserDto);
        return this.UserRepo.save(updated);
        
    }

    // 6- method to update only the password
    async updatePassword(id: number, newPassword:string): Promise<void>{
        
        const newPasswordHash = await hashPassword(newPassword);

        const result = await this.UserRepo.update(id , {
            password: newPasswordHash,
            updated_at: new Date(),
        });

        if(result.affected === 0){
            throw new NotFoundException(`User With ID ${id} Not Found`);
        }
    }

    // 7- remove user 
    async remove(id: number): Promise<void>{
        const result = await this.UserRepo.delete(id);

        if (result.affected === 0){
            throw new NotFoundException(`User With ID ${id} Not Found`);
        }
    }
    

    
}