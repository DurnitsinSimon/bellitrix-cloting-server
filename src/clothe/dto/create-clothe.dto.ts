import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateClotheDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsBoolean()
    oneSize: boolean;

    @IsString()
    sizes?: string;
}