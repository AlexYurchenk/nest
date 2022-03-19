import { IsString, IsEmail } from 'class-validator';

export class RegistrationAuthDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
