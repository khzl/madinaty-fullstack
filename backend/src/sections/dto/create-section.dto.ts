import { IsString, IsOptional, IsNumber,MinLength,MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSectionDto{

    @ApiProperty({
        description: 'The Title Or Name The Administrative section.',
        example: 'Roads & Infrastructure',
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    title: string;

    @ApiProperty({
        description: 'URL or Path to an Icon Or Picture representing The Section.',
        example: 'https://cdn.example.com/icons/roads.svg',
        required: false,
    })
    @IsOptional()
    @IsString()
    picture?: string;

    @ApiProperty({
        description: 'A detailed description of what this section covers',
        example: 'Handles all maintenance and planning for public roads , bridges , and sidewalks',
        minLength: 500,
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(500)
    description?: string;

    @ApiProperty({
        description: 'The ID Of The Parent Section , if this is a sub-section',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    parent_section_id?: number;
}