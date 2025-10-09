import { IsNumber, IsEnum , IsOptional, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Define The Allowed Status Values for a problem 
export enum ProblemStatus{
    REPORTED = 'reported',
     // Initial status when a problem is created
    IN_PROGRESS = 'in_progress',
     // Status when the government starts working on it
    RESOLVED = 'resolved', 
    // Final status when the problem is fixed
    REJECTED = 'rejected', 
    // Status when the problem is deemed invalid or duplicate
}

export class CreateProblemStateDto{


    @ApiProperty({
        description: 'The New status of the problem.',
        enum: ProblemStatus,
        example: ProblemStatus.IN_PROGRESS,
    })
    @IsEnum(ProblemStatus)
    status: ProblemStatus;

    @ApiProperty({
        description: 'The ID of the problem whose state is being updated.',
        example: 45,
    })
    @IsNumber()
    problem_id: number;

    @ApiProperty({
        description: 'The ID of the government user who updated the status (Solver ID).',
        example: 201,
    })
    @IsNumber()
    solved_by: number;
}