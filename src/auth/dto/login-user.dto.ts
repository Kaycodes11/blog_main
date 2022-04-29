import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Rating {
  None = 'None',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Artists = 'Artists',
}

export enum Platform {
  WEB = `WEB`,
  MOBILE = 'MOBILE',
}

export class LoginUserDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  id?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ enum: Platform, default: Platform.WEB })
  @IsOptional()
  platform: Platform;

  // @ApiPropertyOptional({ enum: ['WEB', 'MOBILE'], default: Platform.WEB })
  // @IsOptional()
  // platform: Platform;

  @ApiPropertyOptional({ type: [String] })
  usernames: Array<string>;

  // when having circular dependencies
  // @ApiProperty({type: () => DependantClass})
  // dependantClass: DependantClass

  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     type: 'array',
  //     items: {
  //       type: 'number',
  //     },
  //   },
  // })
  // coords: number[][];
  //
  // @ApiPropertyOptional({
  //   type: 'object',
  //   items: {
  //     properties: { lastLoggedIn: { type: `string` } },
  //     type: 'string',
  //   },
  // })
  // @IsOptional()
  // metadata: { lastLoggedIn: string };
}
