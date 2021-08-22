import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './db/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'jwt_auth',
    entities: [User],
    synchronize: true,
  }),
  // CONFIGURE USER REPOSITORY
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: "ONE PIECE",
    signOptions: {expiresIn: "1d"}
  })
],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
