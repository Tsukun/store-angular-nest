import { PayloadUserI } from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { Token, TokenDocument } from "./schemas/token.schema";

export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>
  ) {}

  generateToken(payload: PayloadUserI) {
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_KEY), {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(
      payload,
      String(process.env.JWT_REFRESH_KEY),
      {
        expiresIn: "30m",
      }
    );

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, String(process.env.JWT_ACCESS_KEY));
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, String(process.env.JWT_REFRESH_KEY));
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await this.tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}
