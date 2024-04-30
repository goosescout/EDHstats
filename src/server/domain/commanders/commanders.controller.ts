import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TournamentParamsDto } from './dtos/tournamentParams.dto';
import { Commander } from './models/commander.model';

import { CommandersService } from './commanders.service';

@Controller('/api/commanders')
export class CommandersController {
  constructor(private commandersService: CommandersService) {}

  @ApiOperation({
    summary:
      'Get all commanders from tournaments with parameters specified in request body',
  })
  @ApiResponse({
    status: 200,
    description: 'Commanders successfully fetched',
    type: Commander,
  })
  @ApiResponse({
    status: 400,
    description: 'Some of the provided parameters are invalid',
  })
  @Get()
  async getCommanders(
    @Query() tournamentParams: TournamentParamsDto,
  ): Promise<Commander[]> {
    return await this.commandersService.getCommanders(tournamentParams);
  }
}
