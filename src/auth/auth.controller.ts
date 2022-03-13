import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/auth-login.dto';
import { RegistrationAuthDto } from './dto/auth-registration.dto';
import { USER_NOT_FOUNDED } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() dto: RegistrationAuthDto) {
    return this.authService.registration(dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    const result = await this.authService.login(dto);
    if (!result) {
      throw new HttpException(USER_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
}
