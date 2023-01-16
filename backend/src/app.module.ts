import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";

//import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./middleware/auth-middleware";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/auth-react"),
    ConfigModule.forRoot(),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("test");
  }
}
