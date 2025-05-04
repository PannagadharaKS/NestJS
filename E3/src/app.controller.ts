import { Body, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async guide() {
    return "GO TO /users PAGE";
  }

}

