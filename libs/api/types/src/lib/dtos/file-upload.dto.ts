import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}
