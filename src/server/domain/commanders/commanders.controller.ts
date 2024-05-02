import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AllowAny } from '@server/domain/auth/decorators/allowAny.decorator';
import { JwtAuthGuard } from '@server/domain/auth/guards/jwt-auth.guard';
import { TTL_1_DAY } from '@server/infrastructure/constants';

import { GetCommandersParamsDto } from './dtos/getCommandersParams.dto';
import { Commander } from './models/commander.model';
import { CommanderBrief } from './models/commanderBrief.model';

import { CommandersService } from './commanders.service';

@ApiTags('Commanders')
@Controller('/api/commanders')
export class CommandersController {
  constructor(private commandersService: CommandersService) {}

  @ApiOperation({
    summary: 'Get all commanders from tournaments with specified parameters',
  })
  @ApiOkResponse({
    description: 'List of commanders and their stats',
    type: Commander,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowAny()
  async getCommanders(
    @Query() tournamentParams: GetCommandersParamsDto,
  ): Promise<Commander[]> {
    return await this.commandersService.getCommanders(tournamentParams);
  }

  @ApiOperation({
    summary:
      'Get a brief commander description which name matches the search query',
  })
  @ApiQuery({
    name: 'query',
    description: 'Search query. If not provided, all commanders are returned',
    example: 'Kess',
    required: false,
  })
  @ApiOkResponse({
    description: 'List of commanders',
    type: CommanderBrief,
    isArray: true,
  })
  @Get('/search')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowAny()
  async searchCommanders(
    @Query('query') query: string,
  ): Promise<CommanderBrief[]> {
    return await this.commandersService.searchCommanders(query);
  }

  @ApiOperation({
    summary: 'Get favorite commanders of the authenticated user',
  })
  @ApiOkResponse({
    description: 'List of brief description of favorite commanders',
    type: CommanderBrief,
    isArray: true,
  })
  @Get('/favorite')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getFavoriteCommanders(@Req() req: any): Promise<CommanderBrief[]> {
    return await this.commandersService.getFavoriteCommanders(req.user.id);
  }

  @ApiOperation({
    summary:
      'Get a single commander from tournaments with specified parameters',
  })
  @ApiParam({
    name: 'name',
    description: 'Commander name',
    example: 'Kess, Dissident Mage',
  })
  @ApiOkResponse({
    description: 'Commander and their stats',
    type: Commander,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @ApiNotFoundResponse({
    description: 'Commander not found',
  })
  @Get('/:name')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowAny()
  async getCommander(
    @Param('name') name: string,
    @Query() tournamentParams: GetCommandersParamsDto,
  ): Promise<Commander> {
    const commander = await this.commandersService.getCommander({
      name,
      ...tournamentParams,
    });

    if (!commander) throw new NotFoundException('Commander not found');

    return commander;
  }

  @ApiOperation({
    summary:
      'Get commander images if commanders are partners or a flip card. Otherwise, get a single image',
  })
  @ApiParam({
    name: 'name',
    description: 'Commander name',
    example: 'Kess, Dissident Mage',
  })
  @ApiOkResponse({
    description:
      'List of commander images (or a single image if not partners or a flip card)',
    type: String,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Commander not found',
  })
  @Get('/:name/images')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowAny()
  async getCommanderImages(@Param('name') name: string): Promise<string[]> {
    const images = await this.commandersService.getCommanderImages(name);

    if (!images) throw new NotFoundException('Commander not found');

    return images;
  }

  @ApiOperation({
    summary: 'Toggle commander as favorite for the authenticated user',
  })
  @ApiParam({
    name: 'name',
    description: 'Commander name',
    example: 'Kess, Dissident Mage',
  })
  @ApiResponse({
    status: 204,
    description: 'If commander exists, its favorite status was toggled',
  })
  @ApiBearerAuth()
  @HttpCode(204)
  @Post('/:name/favorite')
  @UseGuards(JwtAuthGuard)
  async toggleCommanderFavorite(@Param('name') name: string, @Req() req: any) {
    await this.commandersService.toggleCommanderFavorite(name, req.user.id);
  }
}
