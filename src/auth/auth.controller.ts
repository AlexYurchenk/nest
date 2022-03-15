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
import { USER_NOT_FOUNDED, USER_HAS_ALREADY_EXISTED } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() dto: RegistrationAuthDto) {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new HttpException(USER_HAS_ALREADY_EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.authService.registration(dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    const { _id } = await this.authService.validateUser(dto);
    return this.authService.login(_id);
  }
}
