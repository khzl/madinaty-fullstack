import { Injectable } from '@nestjs/common';
import { File as MulterFile } from 'multer';

@Injectable()
export class UploadsService {
  getFileInfo(file: MulterFile) {
    // return path that you will store in DB, adjust to your static serving
    const url = `/uploads/${file.filename}`;
    return { filename: file.filename, path: url };
  }
}
