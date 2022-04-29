import { ApiProperty } from '@nestjs/swagger';

// single upload
// export class FileUploadDto {
//   @ApiProperty({ type: `string`, format: 'binary' })
//   file: any;
// }

// multiple upload
export class FileUploadDto {
  @ApiProperty({ type: `array`, items: { type: 'string', format: 'binary' } })
  file: any[];
}

// to add an extension  to request do this, prefixing by x is  mandatory
// @ApiExtension('x-foo', { hello: 'world' })
