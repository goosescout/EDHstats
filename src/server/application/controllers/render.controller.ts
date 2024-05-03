import { Controller, Get, Param, Render } from '@nestjs/common';

import { AllowJwtAny } from '@server/domain/auth/decorators/allowAny.decorator';

@Controller()
export class RenderController {
  @Get()
  @Render('index')
  @AllowJwtAny()
  home() {
    return {};
  }

  @Get('commanders')
  @Render('commanders')
  @AllowJwtAny()
  commanders() {
    return {};
  }

  @Get('card-choices')
  @Render('card-choices')
  @AllowJwtAny()
  cardChoices() {
    return {};
  }

  @Get('card-choices/:name')
  @Render('card-choices/[name]')
  @AllowJwtAny()
  commanderAnalytics(@Param('name') name: string) {
    return { name };
  }
}
