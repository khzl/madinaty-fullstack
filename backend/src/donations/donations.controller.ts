import { Controller,
    Get,Post,Body,Patch,Param,Delete,
    UseGuards,ParseIntPipe,Req,Query
 } from "@nestjs/common";
import { ApiTags,ApiOperation,
    ApiResponse,ApiBearerAuth,ApiUnauthorizedResponse,
    ApiForbiddenResponse,ApiNotFoundResponse,
    ApiQuery
 } from "@nestjs/swagger";
import { DonationsService } from "./donations.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { Donation } from "./entities/donation.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DonationQueryDto } from "./dto/donation.query.dto";

@ApiTags('donations')
@ApiBearerAuth()
@Controller('donations')
export class DonationsController {

    constructor(private readonly donationsService: DonationsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Create a New Donation Record'
    })
    @ApiResponse({
        status: 201,
        description: 'Donation Successfully Recorded',
        type: Donation
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized (Missing Or Invalid Token)'
    })
    create(
        @Body()donationDto: CreateDonationDto,
        @Req()request: any
    ){

        const userId = request.user.id;

        return this.donationsService.create(donationDto,userId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
    summary: 'Retrieve all donations (Admin/Govt) or donations by problem/donor (User).',
    description: 'Use query params to filter by problem ID or user ID. Authorization limits visibility.'
    })
    @ApiQuery({ 
        name: 'problemId',
        required: false,
        type: Number 
    })
    @ApiQuery({ 
        name: 'userId',
        required: false,
        type: Number 
    })
    @ApiResponse({ 
        status: 200,
        description: 'List of filtered donations.',
        type: [Donation] 
    })
    findAll(@Query()queryDto: DonationQueryDto){

        const problemId = queryDto.problemId ? parseInt(queryDto.problemId, 10) : undefined;
        const userId = queryDto.userId ? parseInt(queryDto.userId, 10) : undefined;

        return this.donationsService.findAll(problemId,userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Retrieve a single donation record by ID'
    })
    @ApiResponse({
        status: 200,
        description: 'The Donation Object',
        type: Donation
    })
    @ApiNotFoundResponse({
        description: 'Donation Not Found'
    })
    findOne(@Param('id',ParseIntPipe)id:number){
        return this.donationsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ 
    summary: 'Update donation details (Requires donor or Admin/Government role).',
    description: 'This is usually restricted in financial systems. Checks for owner/admin role.' 
    })
    @ApiResponse({ 
        status: 200,
        description: 'Donation updated successfully.',
        type: Donation 
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden (User is not the donor or an authorized admin).'
    })
    update(
        @Param('id',ParseIntPipe)id: number,
        @Body()donationDto: UpdateDonationDto,
        @Req()request: any
    ){

        const currentUserId = request.user.id;
        const currentUserRole = request.user.role;

        return this.donationsService.update(id,donationDto,currentUserId,currentUserRole);

    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard) 
    @ApiOperation({ 
    summary: 'Soft-delete a donation record (Requires donor or Admin/Government role).',
    description: 'The record is soft-deleted for audit purposes.'
    })
    @ApiResponse({ 
        status: 200,
        description: 'Donation soft-deleted successfully.'
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden (User is not the donor or an authorized admin).' 
    })
    remove(
        @Param('id', ParseIntPipe)id: number,
        @Req()request: any
    ){

        const currentUserId = request.user.id;
        const currentUserRole = request.user.role;

        return this.donationsService.remove(id,currentUserId,currentUserRole);
    }
    

}