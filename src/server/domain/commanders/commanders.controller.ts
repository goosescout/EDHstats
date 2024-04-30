import { Body, Controller, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TournamentParamsDto } from './dtos/tournamentParams.dto';

import { CommandersService } from './commanders.service';

@Controller('/api/commanders')
export class CommandersController {
  constructor(private commandersService: CommandersService) {}

  @ApiOperation({
    summary:
      'Get all commanders from tournaments with parameters specified in request body',
  })
  @ApiBody({ type: TournamentParamsDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Commanders successfully fetched',
  })
  @ApiResponse({
    status: 400,
    description: 'Some of the provided parameters are invalid',
  })
  @Get()
  async getCommanders(@Body() tournamentParams: TournamentParamsDto) {
    return [];
  }
}
