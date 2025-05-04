import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [ProductsModule, MongooseModule.forRoot("mongodb://localhost:27017/nest_e1")],                          // LINK MODULES TOGETHER
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}