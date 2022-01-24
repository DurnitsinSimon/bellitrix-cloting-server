import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateClotheDto {
  @IsString()
  _id: ObjectId;

  @IsString()
  name: string;

  @IsString()
  src: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsBoolean()
  oneSize: boolean;

  @IsBoolean()
  soldOut: boolean;

  @IsString()
  sizes?: string;
}
