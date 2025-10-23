import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
  MulterModule.register({
  storage: diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {

  const name = `${Date.now()}${extname(file.originalname)}`;
  cb(null, name);
  },
  }),
  fileFilter: (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
  return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
  }),
 ],
 controllers: [UploadsController],
 providers: [UploadsService],
 exports: [UploadsService],
 })
 
export class UploadsModule {}
