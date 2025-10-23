import { IsNotEmpty, IsString, IsNumber, IsBoolean,IsOptional } from "class-validator";

export class CreateNotificationDto {

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsBoolean()
    isRead?: boolean;
}