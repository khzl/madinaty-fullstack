import { IsNumber, IsIn, IsEnum , IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum VoteValue{
    UPVOTE = 1,
    DOWNVOTE = -1,
}

export class CreateVoteDto{

    @ApiProperty({
        description: 'The Value of The Vote (1 For upvote , -1 for downvote).',
        enum: VoteValue,
        example: 1,
    })
    @IsEnum(VoteValue)
    value: VoteValue;

    @ApiProperty({
        description: 'The ID of the problem being voted on.',
        example: 45,
    })
    @IsNumber()
    problem_id: number;
}