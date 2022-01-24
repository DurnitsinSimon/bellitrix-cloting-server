import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { NOT_FOUND_CLOTHE } from './clothe.constants';
import { Clothe, ClotheDocument } from './clothe.model';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';

@Injectable()
export class ClotheService {
  constructor(
    @InjectModel(Clothe.name)
    private readonly clotheModel: Model<ClotheDocument>,
    private readonly fileServie: FileService,
  ) {}

  async create(
    dto: CreateClotheDto,
    photo: Express.Multer.File,
  ): Promise<Clothe> {
    const clothe = new this.clotheModel({
      ...dto,
      soldOut: false,
      src: await this.fileServie.saveFile(photo),
    });
    return clothe.save();
  }

  async getAll(): Promise<Clothe[]> {
    return this.clotheModel.find();
  }

  async findById(id: ObjectId): Promise<Clothe> {
    
    
    return this.clotheModel.findById(id);
  }

  async delete(id: ObjectId): Promise<Clothe> {
    return this.clotheModel.findByIdAndDelete(id);
  }

  async update(dto: UpdateClotheDto): Promise<Clothe> {
    const clothe = await this.clotheModel.findById(dto._id);
    if (!clothe) {
      throw new NotFoundException(NOT_FOUND_CLOTHE);
    }
    return this.clotheModel.findByIdAndUpdate(
      dto._id,
      dto,
      { new: true },
    );
  }

  async soldOut(id: ObjectId): Promise<Clothe> {
    const clothe = await this.clotheModel.findById(id);
    if (!clothe) {
      throw new NotFoundException(NOT_FOUND_CLOTHE);
    }
    clothe.soldOut = true;
    return clothe.save();
  }
}
