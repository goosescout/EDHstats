import { Controller, Get, Param, Render } from '@nestjs/common';

import { AllowAny } from '@server/domain/auth/decorators/allowAny.decorator';

@Controller()
export class RenderController {
  @Get()
  @Render('index')
  @AllowAny()
  home() {
    return {};
  }

  @Get('commanders')
  @Render('commanders')
  @AllowAny()
  commanders() {
    return {};
  }

  @Get('card-choices')
  @Render('card-choices')
  @AllowAny()
  cardChoices() {
    return {};
  }

  @Get('card-choices/:name')
  @Render('card-choices/[name]')
  @AllowAny()
  commanderAnalytics(@Param('name') name: string) {
    return { name };
  }
}
