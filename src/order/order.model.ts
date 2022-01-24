import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Clothe } from '../clothe/clothe.model';

export type OrderDocument = Order & Document;

export interface Product {
    clothe: Clothe,
    currentSize: string;
}

@Schema()
export class Order {
 @Prop()
 paymentId: string;

 @Prop()
 fullName?: string;

 @Prop()
 address: string;

 @Prop()
 email: string;

 @Prop()
 phone: string;

 @Prop()
 worldWideShipping: boolean;

 @Prop()
 sumPaid: number;

 @Prop()
 products: Product[];

 @Prop({type: Date})
 date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
