import { Controller, Delete, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller("users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.appService.getAll();
  }

  // GET SINGLE USER
  @Get(":id")
  async getSingleUser(@Param("id") userId: number): Promise<User> {
    return this.appService.getSingleUser(userId);
  }

  // INSERT
  @Post()
  async createUser(name: string): Promise<User> {
    return this.appService.createUser("PANNAGA");
  }

  // UPDATE
  @Patch(":id")
  async updateUser(@Param("id") userId: number, @Body("name") username: string): Promise<User> {
    return this.appService.updateUser(userId, username);
  }

  // DELETE
  @Delete(":id")
  async deleteUser(@Param("id") userId: number): Promise<User> {
    return this.appService.removeUser(userId);
  }
}
