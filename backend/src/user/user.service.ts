import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import { UserDocument } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import UserDto from "./dto/user-dto";
import ApiError from "src/exceptions/api-error";
import { UserJwtPayload } from "./interfaces/user.interface";

export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}
  async registration(email: string, password: string) {
    const candidate = await this.userModel.findOne({ email: email });

    const role = "USER";
    if (candidate) {
      //Поменять на api error
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const activationLink = uuid();

    const user = await this.userModel.create({
      email: email,
      role: role,
      password: hashPassword,
      activation: activationLink,
    });
    // await this.mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );
    const userDto = new UserDto(user.toJSON());

    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активаци");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEqual: boolean = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user.toJSON());
    const tokens = this.tokenService.generateToken({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData: UserJwtPayload = this.tokenService.validateRefreshToken(
      refreshToken
    ) as UserJwtPayload;
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.userModel.findById(userData.id);
    const userDto = new UserDto(user.toJSON());
    const tokens = this.tokenService.generateToken({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
