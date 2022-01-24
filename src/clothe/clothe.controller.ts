import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Clothe } from './clothe.model';
import { ClotheService } from './clothe.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';

@Controller('clothe')
export class ClotheController {
    constructor(private readonly clotheService: ClotheService) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async create(@Body() dto: CreateClotheDto, @UploadedFile() photo: Express.Multer.File): Promise<Clothe> {
        return this.clotheService.create(dto, photo);
    }

    @Get('getAll')
    async getAll(): Promise<Clothe[]> {
        return this.clotheService.getAll();
    }

    @Get('findById')
    async findById(@Query('id') id: ObjectId): Promise<Clothe> {
        return this.clotheService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('soldOut')
    async soldOut(@Query('id') id: ObjectId): Promise<Clothe> {
        return this.clotheService.soldOut(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async delete(@Query('id') id: ObjectId): Promise<Clothe> {
        return this.clotheService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async update(@Body() dto: UpdateClotheDto): Promise<Clothe> {
        console.log(dto);
        
        return this.clotheService.update(dto);
    }
}
