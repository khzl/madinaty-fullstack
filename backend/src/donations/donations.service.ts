import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException,ForbiddenException } from "@nestjs/common";
import { IsNull, Not, Repository } from 'typeorm';
import { Donation } from "./entities/donation.entity";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { UserRole } from "src/users/entity/user.entity";

@Injectable()
export class DonationsService {
    constructor(
        @InjectRepository(Donation)
        private readonly donationRepo: Repository<Donation>,
    ) {}

    // create donation
    async create(donationDto: CreateDonationDto, userId: number): Promise<Donation> {

        const donation = this.donationRepo.create({
            ...donationDto,
            user_id: userId,
        });

        return this.donationRepo.save(donation);
    }

    // Find All Donations
    async findAll(problemId?: number, userId?: number): Promise<Donation[]>{

        const where: any = {};

        if (problemId) {
            where.problem_id = problemId;
        }

        if (userId) {
            where.user_id = userId;
        }

        return this.donationRepo.find({
            where: where,
            relations: ['donor','problem'],
            order: { created_at: 'DESC'}
        });
    }

    // Find One Donation
    async findOne(id: number): Promise<Donation>{

        const donation = await this.donationRepo.findOne({
            where: {id},
            relations: ['donor','problem'],
        });

        if(!donation)
            throw new NotFoundException(`Donation With ID ${id} Not Found`);

        return donation;
    }

    // Update donations
    async update(
        id: number,
        donationDto: UpdateDonationDto,
        currentUserId: number,
        currentUserRole: UserRole
    ): Promise<Donation>{

        const donation = await this.findOne(id);

        const isOwner = donation.user_id === currentUserId;
        const isAdminOrGovernment =
        currentUserRole === UserRole.ADMIN || currentUserRole === UserRole.GOVERNMENT;


        if (!isOwner && !isAdminOrGovernment) {
            throw new ForbiddenException
            ('You do not have permission to update this donation record. Only the donor or a system administrator may modify it.');
        }  

        Object.assign(donation,donationDto);
        return this.donationRepo.save(donation);
    }

    // remove donation
    async remove(
        id: number,
        currentUserId: number,
        currentUserRole: UserRole
    ): Promise<void> {
        
        const donation = await this.findOne(id);

        const isOwner = donation.user_id === currentUserId;
        const isAdminOrGovernment = 
        currentUserRole === UserRole.ADMIN || currentUserRole === UserRole.GOVERNMENT;

        if (!isOwner && !isAdminOrGovernment){
            throw new ForbiddenException(
                'You do not have permission to remove this donation record. Only the donor or a system administrator may delete it.'
            );
        }

        const deleteResult = await this.donationRepo.softDelete(id);

        if (deleteResult.affected === 0){
            throw new NotFoundException(`Donation With ID ${id} Not Found`);
        }
    }

    // find all records 
    async findAllDeleted(): Promise<Donation[]> {
        return this.donationRepo.find({
            withDeleted: true,
            where: {
                deletedAt: Not(IsNull())
            }
        });
    }

    
}