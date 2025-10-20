import { IsOptional,IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DonationQueryDto {

    @ApiProperty({
        required: false,
        description: 'Filter Donations by The ID Of The Related Problem'
    })
    @IsOptional()
    @IsNumberString()
    problemId?: string;

    @ApiProperty({
        required: false,
        description: 'Filter Donations by The Id Of The Donor User'
    })
    @IsOptional()
    @IsNumberString()
    userId?: string;
}