import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsUUID('4')
  resetPasswordToken: string;

  @IsNotEmpty()
  clave: string;
}
