import { IsNumber, IsString, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Define common supported currencies as constant array for validation
const SupportedCurrencies = ['USD', 'EUR' , 'EGP' , 'GBP' , 'DIQ'];

export class CreateDonationDto{

    @ApiProperty({
        description: 'The amount of the donation.',
        example: 50.00,
        minimum: 1, // Assumes a minimum donation amount
    })
    @IsNumber()
    amount: number;


    @ApiProperty({
        description: 'The Currency Code Of The donation (e.g., USD , EGP).',
        enum: SupportedCurrencies,
        example: 'USD',
    })
    @IsString()
    @IsIn(SupportedCurrencies)
    currency: string;

    @ApiProperty({
        description: 'The ID of The problem the donation is intended for.',
        example: 45,
    })
    @IsNumber()
    problem_id: number;

    
}