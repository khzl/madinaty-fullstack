import { IsOptional,
    IsNumberString, IsInt, Min , MAX
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProblemQueryDto {

    @ApiProperty({
        required: false,
        default: 1,
        description: 'Page Number For Pagination'
    })
    @IsOptional()
    @IsNumberString()
    page?: string = '1';

    @ApiProperty({
        required: false,
        default: 10,
        description: 'Number Of Items Per Page'
    })
    @IsOptional()
    @IsNumberString()
    limit?: string = '10';

    @ApiProperty({
        required: false,
        description: 'Filter By Section ID'
    })
    @IsOptional()
    @IsNumberString()
    sectionId?: string;

    @ApiProperty({
        required: false,
        description: 'Filter By Problem State ID'
    })
    @IsOptional()
    @IsNumberString()
    stateId?: string;

    @ApiProperty({
        description: 'Search term Applied To the Problem title'
    })
    @IsOptional()
    @IsNumberString()
    searchTerm: string;
}