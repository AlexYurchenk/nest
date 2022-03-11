import { AuthModel } from './auth.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RegistrationAuthDto } from './dto/auth-registration.dto';
import { LoginAuthDto } from './dto/auth-login.dto';
import { DocumentType } from '@typegoose/typegoose';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel)
    private readonly authModel: ModelType<AuthModel>,
  ) {}
  async registration(
    dto: RegistrationAuthDto,
  ): Promise<DocumentType<AuthModel>> {
    return this.authModel.create(dto);
  }
  async login(dto: LoginAuthDto): Promise<DocumentType<AuthModel> | null> {
    return this.authModel.findOne({ email: dto.email });
  }
}
