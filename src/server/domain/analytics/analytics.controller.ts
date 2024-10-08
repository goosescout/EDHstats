import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Get,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AllowJwtAny } from '@server/domain/auth/decorators/allowAny.decorator';
import { TTL_1_DAY } from '@server/infrastructure/constants';

import { CardsDto } from './dtos/cards.dto';
import { GetAverageStatsParamsDto } from './dtos/getAverageStatsParams.dto';
import { GetCardsParamsDto } from './dtos/getCardsParams.dto';
import { GetCommanderStatsDto } from './dtos/getCommanderStats.dto';
import { AverageStats } from './models/averageStats.model';
import { Card } from './models/card.model';
import { CommanderStats } from './models/commanderStats.model';

import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('/api/analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @ApiOperation({
    summary:
      'Get average stats for all commanders from tournaments with specified parameters',
  })
  @ApiOkResponse({
    description: 'Average stats',
    type: AverageStats,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Get('/average-stats')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowJwtAny()
  async getAverageStats(
    @Query() tournamentParams: GetAverageStatsParamsDto,
  ): Promise<AverageStats> {
    return await this.analyticsService.getAverageStats(tournamentParams);
  }

  @ApiOperation({
    summary:
      'Get all cards that are played in decks of the specified commander',
  })
  @ApiParam({
    name: 'name',
    description: "Commander' name",
  })
  @ApiOkResponse({
    description: 'List of cards with their stats',
    type: Card,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Get('/:name/cards')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  @AllowJwtAny()
  async getCards(
    @Param('name') name: string,
    @Query() tournamentParams: GetCardsParamsDto,
  ): Promise<Card[]> {
    return await this.analyticsService.getCards({ name, ...tournamentParams });
  }

  @ApiOperation({
    summary:
      'Get stats for the specified commander. Despite being a POST request, the request does not modify any data, but it can use a body to pass a list of cards',
  })
  @ApiParam({
    name: 'name',
    description: "Commander' name",
  })
  @ApiBody({
    description: 'Lists of included and excluded cards',
    type: CardsDto,
  })
  @ApiOkResponse({
    description: "Commander's stats with the specified cards",
    type: CommanderStats,
  })
  @ApiNotFoundResponse({
    description: "Commander's or one of the cards not found",
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Post('/:name')
  @HttpCode(200)
  @AllowJwtAny()
  async getCommanderStatsWithCards(
    @Param('name') name: string,
    @Query() tournamentParams: GetCommanderStatsDto,
    @Body() cards: CardsDto,
  ): Promise<CommanderStats> {
    return this.analyticsService.getCommanderStats({
      name,
      ...tournamentParams,
      ...cards,
    });
  }
}
