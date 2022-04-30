import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';

export class CatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}

// this will make all the properties from CatDto optional
// export class UpdateCatDto extends  PartialType(CatDto) {}

// pick the specific property/properties
// export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}
// export class UpdateCatDto extends OmitType(CreateCatDto, ['name'] as const) {}

// combining two or more dto

// export class NewAdditionalCatInfo {
//   @ApiProperty()
//   color: string;
// }

// export class UpdateCatDto extends IntersectionType(CatDto, NewAdditionalCatInfo ) {}

// composition
// export class UpdateCatDto extends PartialType(
//   OmitType(CreateCatDto, ['name'] as const),
// ) {}
