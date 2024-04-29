import { Controller, Get } from '@nestjs/common';

import { CommandersService } from './commanders.service';

@Controller('/api/commanders')
export class CommandersController {
  constructor(private readonly commandersService: CommandersService) {}

  @Get('/test')
  test() {
    return this.commandersService.getCommanders();
  }
}
