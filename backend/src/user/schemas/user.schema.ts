import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;

  @Prop({ type: Boolean, default: false })
  isActivated: boolean;

  @Prop({ type: String })
  activation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
