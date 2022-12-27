import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import ApiError from "../exceptions/api-error";
export default function (req: any, res: any, next: any) {
  try {
    const authorizationHeader = req.header.authorizationHeader;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    //const userData = new Token
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.values()["authorization"];
      console.log(authorizationHeader);
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }

      //const userData = new Token
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  }
}
