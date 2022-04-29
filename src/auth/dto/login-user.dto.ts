import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

type Platform = 'web' | 'mobile';

export class LoginUserDto {
  @IsUUID()
  @IsNotEmpty()
  id?: string;

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
