import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { getJwtConfig } from 'src/configs/jwt.config';
import { FileModule } from 'src/file/file.module';
import { ClotheController } from './clothe.controller';
import { Clothe, ClotheSchema } from './clothe.model';
import { ClotheService } from './clothe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clothe.name, schema: ClotheSchema }]),
    FileModule,
    JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
  ],
  controllers: [ClotheController],
  providers: [ClotheService],
})
export class ClotheModule {}
