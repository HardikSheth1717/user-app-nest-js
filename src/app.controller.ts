import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage(): string {
    return this.appService.getHomePage();
  }

  // @Get('/*')
  // get404Page(): string {
  //   return this.appService.get404Page();
  // }
}
