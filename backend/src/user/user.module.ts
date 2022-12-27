import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./schemas/user.schema";
import { Token, TokenSchema } from "./schemas/token.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService, MailService],
})
export class UserModule {}
