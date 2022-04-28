import { isDefined, IsDefined, IsNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsDefined()
  firstName!: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsNumber()
  @IsDefined()
  age: number;

  @IsString()
  @IsDefined()
  gender: string;
}
