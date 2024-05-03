import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { hash } from 'bcrypt';

import { UsersService } from '@server/domain/users/users.service';

import { AllowJwtAny } from './decorators/allowAny.decorator';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessToken } from './models/accessToken.model';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignupDto, description: "User's username and password" })
  @ApiOkResponse({ description: 'Access token', type: AccessToken })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @HttpCode(200)
  @Post('/sign-up')
  @AllowJwtAny()
  async signup(@Body() body: SignupDto): Promise<AccessToken> {
    const salt = 8;
    const hashedPassword = await hash(body.password, salt);
    try {
      const user = await this.usersService.createUser(
        body.username,
        hashedPassword,
      );

      return this.authService.login(user);
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SignupDto, description: "User's username and password" })
  @ApiOkResponse({ description: 'Access token', type: AccessToken })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @AllowJwtAny()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/sign-in')
  async signin(@Req() req): Promise<AccessToken> {
    return this.authService.login(req.user);
  }
}
