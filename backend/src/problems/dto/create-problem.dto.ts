import { IsString, IsOptional, IsNumber , IsDate,
    MinLength,IsUrl,IsJSON
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProblemDto{

    @ApiProperty({
        description: 'a concise title summarizing the problem',
        example: 'Large Pothole On Main Street',
        minLength: 5,
        maxLength: 255,
    })
    @IsString()
    @MinLength(5)
    title: string;

    @ApiProperty({
        description: 'Detailed Description Of The Problem Being Reported..',
        example: 'A Large Pothole Has Opened Up On The Main Road Near The Central Market...',
        minLength: 20,
    })
    @IsString()
    @MinLength(20)
    description: string;

    @ApiProperty({
        description: 'URL or Path an image illustrating the problem',
        example: 'https://cdn.example.com/problems/123.png',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    imageUrl?: string;

    @ApiProperty({
        description: 'Human-readable name of the problem location (e.g., "Main Street near Park"',
        example: 'Main Street , opposite City Hall',
        required: false,
        minLength: 255,
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
    @IsJSON()
    location_map?: string;

    @ApiProperty({
        description: 'ID of the section/category the problem belongs to..',
        example: 5,
    })
    @IsNumber()
    sectionId: number;

    @ApiProperty({
        description: 'Optional ID Of The Initial problem state',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    stateId?: number;
}