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
    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user.toJSON());

    const tokens = this.tokenService.generateToken({ ...userDto });

    return { ...tokens, user: userDto };
  }
}
