import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/auth-login.dto';
import { RegistrationAuthDto } from './dto/auth-registration.dto';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registration(@Body() dto: RegistrationAuthDto) {
    return 'auth - registration';
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return 'auth - login';
  }
}
