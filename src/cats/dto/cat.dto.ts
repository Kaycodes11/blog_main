import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
