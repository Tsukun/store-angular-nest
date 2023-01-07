import { TokenService } from "./../user/token.service";
import { Injectable, NestMiddleware, Next, Req, Res } from "@nestjs/common";
import ApiError from "../exceptions/api-error";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  use(@Req() req, @Res() res, @Next() next) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = this.tokenService.validateAccessToken(accessToken);
      console.log("userData ", userData);
      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      req.user = userData;

      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  }
}
