import { IsOptional,IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class VoteQueryDto {

    @ApiProperty({
        required: false,
        default: '1',
        description: 'Page Number For Pagination'
    })
    @IsOptional()
    @IsNumberString()
    page?: string = '1';

    @ApiProperty({
        required: false,
        default: '10',
        description: 'Number Of Votes Per Page'
    })
    @IsOptional()
    @IsNumberString()
    limit?: string = '10';

    @ApiProperty({
        required: false ,
        description: 'Filter Votes By The ID Of The Problem they belong to..'
    })
    @IsOptional()
    @IsNumberString()
    problemId?: string;

    @ApiProperty({
        required: false,
        description: 'Filter Votes By The ID Of The User Who Cast The Vote.'
    })
    @IsOptional()
    @IsNumberString()
    userId?: string;
}