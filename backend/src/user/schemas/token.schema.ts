import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type TokenDocument = HydratedDocument<Token>;

export class Token {
  @Prop({ type: String })
  user: string;

  @Prop({ type: String })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
