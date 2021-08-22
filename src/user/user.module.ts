import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../db/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [TypeOrmModule.forFeature([User]), 
            JwtModule.register({
                secret: "ONE PIECE",
                signOptions: {expiresIn: "1d"}
            }),],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}