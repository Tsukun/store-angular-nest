import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./middleware/auth-middleware";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/auth-react"),
    UserModule,
    ConfigModule.forRoot(),
    //mongodb://tsukune:eBvHuZX6r6gJh6xo@127.0.0.1:27017/auth-react?directConnection=true&retryWrites=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats");
  }
}
