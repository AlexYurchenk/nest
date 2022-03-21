import { Mfile } from './mfile';
import { FilesService } from './files.service';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  //  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() files: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const array: Mfile[] = [new Mfile(files)];
    if (files.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebp(files.buffer);
      array.push(
        new Mfile({
          originalname: `${files.originalname.split('.')[0]}.webp`,
          buffer,
        }),
      );
    }
    return this.filesService.saveFiles(array);
  }
}
