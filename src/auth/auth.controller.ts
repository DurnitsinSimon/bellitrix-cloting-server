import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto): Promise<User> {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() { login, password }: AuthDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(login, password);
    return this.authService.login(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getProfile(@Request() req): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.generateToken(req.user.login);

    return {
      ...accessToken,
    };
  }
}
