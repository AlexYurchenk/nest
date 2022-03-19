import { Types } from 'mongoose';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ID_WAS_NOT_FOUND } from './id-validation.constance';
Injectable();
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_WAS_NOT_FOUND);
    }
    return value;
  }
}
