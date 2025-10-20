import { IsNumber, IsString, IsIn, Min, IsOptional, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Define common supported currencies as constant array for validation
const SupportedCurrencies = ['USD', 'EUR' , 'EGP' , 'GBP' , 'IQD'];
const AllowedPaymentMethods = ['Credit Card','Paypal','Bank Transfer','Cash'];

export class CreateDonationDto{

    @ApiProperty({
        description: 'The amount of the donation.',
        example: 50.00,
        minimum: 0.01, // Assumes a minimum donation amount
    })
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    amount: number;


    @ApiProperty({
        description: 'The Currency Code Of The donation (e.g., USD , EGP).',
        enum: SupportedCurrencies,
        example: 'IQD',
        maxLength: 3,
    })
    @IsString()
    @IsIn(SupportedCurrencies)
    currency: string;

    @ApiProperty({
        description: 'The Method Used for the Donation',
        enum: AllowedPaymentMethods,
        example: 'Credit Card',
    })
    @IsString()
    @IsIn(AllowedPaymentMethods)
    paymentMethod: string;

    @ApiProperty({
        description: 'The ID of The problem the donation is intended for.',
        example: 45,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    problem_id?: number;

    @ApiProperty({
        description: 'An Optional Message From The Donor',
        example: 'Hpe This Helps',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Max(255)
    message?: string;
    
}