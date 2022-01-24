import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClotheDocument = Clothe & Document;

@Schema()
export class Clothe {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop()
    oneSize: boolean;

    @Prop()
    soldOut: boolean;

    @Prop()
    src: string;

    @Prop()
    sizes?: string;
}

export const ClotheSchema = SchemaFactory.createForClass(Clothe);
