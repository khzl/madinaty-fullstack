import { IsNumber, IsEnum , IsOptional, IsBoolean, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVoteDto{

    @ApiProperty({
        description: 'The Direction Of The Vote (true for upvote, false for downvote).',
        example: true,
    })
    @IsBoolean()
    IsUpvote: boolean;

    @ApiProperty({
        description: 'The ID of the problem being voted on.',
        example: 45,
    })
    @IsInt()
    problem_id: number;
}