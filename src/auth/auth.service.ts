import { UserModel } from './user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RegistrationAuthDto } from './dto/auth-registration.dto';
import { DocumentType } from '@typegoose/typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUNDED, WRONG_PASSWORD } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async registration(
    dto: RegistrationAuthDto,
  ): Promise<DocumentType<UserModel>> {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(dto: {
    email: string;
    password: string;
  }): Promise<Pick<UserModel, '_id'>> {
    const user = await this.findUser(dto.email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUNDED);
    }
    const isCorrectPassword = await compare(dto.password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }
    return { _id: user._id };
  }
  async login(_id: Types.ObjectId) {
    const payload = { _id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
