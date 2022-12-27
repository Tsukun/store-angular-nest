import { UserService } from "./user.service";
import { Controller, Next, Post, Req, Res } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("registration")
  async registration(@Req() req, @Res() res, @Next() next) {
    const { email, password } = req.body;
    console.log(email, password);
    const userData = await this.userService.registration(email, password);
    res.json(userData);
  }
}
