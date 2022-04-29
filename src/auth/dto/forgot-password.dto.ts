import { LoginUserDto } from './login-user.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IS_ALPHANUMERIC, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordDto extends PickType(LoginUserDto, [
  'email',
] as const) {
  // @ApiProperty()
  // @MinLength(6)
  // @IsNotEmpty()
  // newPassword: string;
}
