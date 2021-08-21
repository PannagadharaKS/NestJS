import { Body, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private jwtService: JwtService) {}

  // REGISTER
  @Post("register")
  async register(@Body("name") name: string, @Body("email") email: string, @Body("password") password: string) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = this.appService.create({
        name,
        email,
        password: hashedPassword
      });
      return user;
  }

  // LOGIN
  @Post("login")
  async login(@Body("email") email: string, @Body("password") password: string, @Res({passthrough: true}) response: Response) {
    const user = await this.appService.findOne({email});
    if(!user) {
      throw new BadRequestException("INVALID CREDENTIALS!");
    }
    if(!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("INVALID CREDENTIALS!");
    }

    // STORE JWT AS COOKIE IN HTTP
    const jwt = await this.jwtService.signAsync({id: user.id});
    response.cookie("jwt", jwt, {httpOnly: true});

    return {
      message: "SUCCESS"
    };
  }

  // FETCH USER IF VERIFIED
  @Get("user")
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies["jwt"];
      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.appService.findOne(data["id"]);
      const {password, ...result} = user;
      return result;
    } catch(e) {
      throw new UnauthorizedException();
    }
  }

  // LOGOUT
  @Post("logout")
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie("jwt");
    return {
      message: "SUCCESS"
    }
  }

}

