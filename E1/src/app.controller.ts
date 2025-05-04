import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get("admin")
  // getHello(): {} {
  //   return {name: "ONE PIECE"};
  //   // return this.appService.getHello();
  // }

  @Get()
  @Render("index")
  root() {
    return {anime: "ONE PIECE"};
  }

}
