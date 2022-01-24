import { Injectable } from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';
import { path } from 'app-root-path';


@Injectable()
export class FileService {
    async saveFile(file: Express.Multer.File): Promise<string> {
        if(!file) {
            return '';
        }
        const uploadFolder = `${path}/uploads`;
        await ensureDir(uploadFolder);
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return `/static/${file.originalname}`;

    }

}
