import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {

  // DATA MAPPER
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  // GET ALL
  getAll(): Promise<User[]> {
    return this.usersRepository.find();// SELECT * FROM USER JOIN PETS
  }

  // GET SINGLE ITEM
  async getSingleUser(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      console.log(user);
      return user;
    } catch(err) {
      throw err;
    }
  }

  // INSERT
  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({name});
    return this.usersRepository.save(newUser);
  }

  // UPDATE
  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getSingleUser(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  // DELETE
  async removeUser(id: number): Promise<User> {
    const user = await this.getSingleUser(id);
    return this.usersRepository.remove(user);
  }

  // CUSTOM QUERY
  // customQuery(): any {
  //   return this.usersRepository.createQueryBuilder("user").select("name").where("...")
  // }

  getHello(): string {
    return 'Hello World!';
  }
}