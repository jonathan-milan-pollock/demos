import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(objectId: string): string {
    const isValidObjectId = Types.ObjectId.isValid(objectId);

    if (!isValidObjectId) {
      throw new BadRequestException(`Invalid ObjectId ${objectId}`);
    }

    return objectId;
  }
}
