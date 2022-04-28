import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

type Platform = 'web' | 'mobile';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  platform: Platform;

  @IsOptional()
  metadata: object | any;
}
