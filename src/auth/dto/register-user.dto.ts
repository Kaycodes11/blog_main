import {
  isDefined,
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsDefined()
  firstName!: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsEmail()
  @IsString()
  @IsDefined()
  email: string;

  @MaxLength(100)
  @MinLength(6)
  @IsString()
  @IsDefined()
  password: string;

  @IsNumber()
  @IsDefined()
  age: number;

  @IsString()
  @IsDefined()
  gender: string;
}
