import { AuthDto } from './dto/auth-login.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registration(@Body() dto: AuthDto) {
    return '';
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return '';
  }
}
