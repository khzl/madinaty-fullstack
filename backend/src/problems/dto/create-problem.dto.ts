import { IsString, IsOptional, IsNumber , IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProblemDto{

    @ApiProperty({
        description: 'Detailed description of the problem being reported..',
        example: 'A large pothole has opened up on the main road near the central market ..',
        minLength: 10,
    })
    @IsString()
    body: string;

    @ApiProperty({
        description: 'URL or Path an image illustrating the problem',
        example: 'https://cdn.example.com/problems/123.png',
        required: false
    })
    @IsOptional()
    @IsString()
    picture?: string;

    @ApiProperty({
        description: 'Human-readable name of the problem location (e.g., "Main Street near Park"',
        example: 'Main Street , opposite City Hall',
        required: false,
    })
    @IsOptional()
    @IsString()
    location_name?: string;

    @ApiProperty({
        description: 'Geographic map coordinates or reference (e.g., a short URL OR JSON string)',
        example: '{"lat": 30.65 , "lng": 31.25',
        required: false,
    })
    @IsOptional()
    @IsString()
    location_map?: string;

    @ApiProperty({
        description: 'ID of the section/category the problem belongs to..',
        example: 5,
    })
    @IsNumber()
    section_id: number;

    
}