import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { PASSWORD_IS_NOT_VALID, USER_NOT_FOUND_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto): Promise<User> {
    const salt = genSaltSync(10);

    const newUser = new this.userModel({
      login: dto.login,
      passwordHash: hashSync(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(login: string): Promise<User> {
    return this.userModel.findOne({ login }).exec();
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Pick<User, 'login'>> {
    const user = await this.findUser(login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(PASSWORD_IS_NOT_VALID);
    }

    return { login: user.login };
  }

  async login(login: string): Promise<{ accessToken: string }> {
    const payload = { login };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async generateToken(login: string): Promise<{ accessToken: string }> {
    const payload = { login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
