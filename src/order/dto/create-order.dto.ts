import { Product } from "../order.model";
import { IsBoolean, IsNumber, IsString, IsArray } from "class-validator";

export class CreateOrderDto {
  @IsString()
  paymentId: string;

  @IsString()
  fullName?: string;

  @IsString()
  address: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsBoolean()
  worldWideShipping: boolean;

  @IsNumber()
  sumPaid: number;

  @IsArray()
  products: Product[];
}
