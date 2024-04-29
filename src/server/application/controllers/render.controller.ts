import { Controller, Get, Render } from '@nestjs/common';

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
}
