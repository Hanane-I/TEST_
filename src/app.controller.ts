import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('numberConvert')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getHello() {
    const msg = await this.appService.getHello();
    return msg; 
  }

  @Get(':num')
  async getRomain(@Param('num') num){
    const numRomain = await this.appService.getRomain(num);
    return numRomain;
  }
}
