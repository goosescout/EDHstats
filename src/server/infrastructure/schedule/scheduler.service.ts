import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CommandersService } from '@server/domain/commanders/commanders.service';

@Injectable()
export class SchedulerService {
  private logger = new Logger(SchedulerService.name);

  constructor(private commandersService: CommandersService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.logger.log('Starting scheduled database update...');
    this.commandersService.fetchNewCommanders(1);
  }
}
