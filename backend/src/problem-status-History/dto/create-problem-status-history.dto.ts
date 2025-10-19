import { IsInt , IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProblemStatusHistoryDto {

    @ApiProperty({
        description: 'Id Of The Problem Whose Status Was Changed',
        example: 101,
    })
    @IsInt()
    problem_id : number;

    @ApiProperty({
        description: 'Id Of The Previous Problem State (null if this is the first state)',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    old_state_id?: number;

    @ApiProperty({
        description: 'ID Of The New Problem State',
        example: 2,
    })
    @IsInt()
    new_state_id: number;
    
}