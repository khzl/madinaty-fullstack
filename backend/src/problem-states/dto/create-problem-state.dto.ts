import { IsNumber, IsEnum , IsOptional, IsDate, MaxLength, MinLength, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProblemStateDto{

    @ApiProperty({
        description: 'The Unique , Human-Readable name of the problem state (e.g... "Reported" , "In Progress" , "Solved"',
        example: 'New State',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'A Detailed Description Of What this state Signifies In the WorkFlow',
        example: 'This State Means The Issue Has Been Verified And Is Waiting For assignment',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;
}