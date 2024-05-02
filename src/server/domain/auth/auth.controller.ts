import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UsersService } from '@server/domain/users/users.service';

import { SignupDto } from './dtos/signup.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: SignupDto): Promise<{ accessToken: string }> {
    const salt = 8;
    const hashedPassword = await hash(body.password, salt);
    const user = await this.usersService.createUser(
      body.username,
      hashedPassword,
    );
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Req() req) {
    return this.authService.login(req.user);
  }
}
