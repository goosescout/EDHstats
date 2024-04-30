import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { TournamentParamsDto } from './dtos/tournamentParams.dto';
import { Commander } from './models/commander.model';

import { CommandersService } from './commanders.service';

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
  async getCommanders(
    @Query() tournamentParams: TournamentParamsDto,
  ): Promise<Commander[]> {
    return await this.commandersService.getCommanders(tournamentParams);
  }

  @ApiOperation({
    summary:
      'Get a single commander from tournaments with specified parameters',
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
  async getCommander(
    @Param('name') name: string,
    @Query() tournamentParams: TournamentParamsDto,
  ): Promise<Commander> {
    const commander = await this.commandersService.getCommander({
      name,
      ...tournamentParams,
    });

    if (!commander) throw new NotFoundException('Commander not found');

    return commander;
  }
}
