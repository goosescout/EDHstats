import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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
    description: 'Commanders successfully fetched',
    type: Commander,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
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
    description: 'Commanders successfully fetched',
    type: CommanderBrief,
    isArray: true,
  })
  @Get('/search')
  async searchCommanders(
    @Query('query') query: string,
  ): Promise<CommanderBrief[]> {
    return await this.commandersService.searchCommanders(query);
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
    description: 'Commander successfully fetched',
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
}
