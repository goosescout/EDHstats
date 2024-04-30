import { Controller } from '@nestjs/common';

import { CommandersService } from './commanders.service';

@Controller('/api/commanders')
export class CommandersController {
  constructor(private commandersService: CommandersService) {}
}
