import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller()
export class RenderController {
  @Get()
  @Render('index')
  home() {
    return {};
  }

  @Get('commanders')
  @Render('commanders')
  commanders() {
    return {};
  }

  @Get('card-choices')
  @Render('card-choices')
  cardChoices() {
    return {};
  }

  @Get('card-choices/:name')
  @Render('card-choices/[name]')
  commanderAnalytics(@Param('name') name: string) {
    return { name };
  }
}
