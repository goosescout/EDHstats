import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Query, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TTL_1_DAY } from '@server/infrastructure/constants';

import { GetAverageStatsParams } from './dtos/getAverageStatsParams.dto';
import { AverageStats } from './models/averageStats.model';

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
    description: 'Stats successfully fetched',
    type: AverageStats,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are invalid',
  })
  @Get('average-stats')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TTL_1_DAY)
  async test(
    @Query() tournamentParams: GetAverageStatsParams,
  ): Promise<AverageStats> {
    return await this.analyticsService.getAverageStats(tournamentParams);
  }
}
