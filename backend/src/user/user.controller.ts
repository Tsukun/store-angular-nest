import { UserService } from "./user.service";
import { Controller, Next, Post, Req, Res } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("registration")
  async registration(@Req() req, @Res() res, @Next() next) {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(email, password);
    const userData = await this.userService.registration(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    res.json(userData);
  }

  @Post("login")
  async login(@Req() req, @Res() res, @Next() next) {
    const { email, password }: { email: string; password: string } = req.body;
    const userData = await this.userService.login(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post("logout")
  async logout(@Req() req, @Res() res, @Next() next) {
    const { refreshToken } = req.cookies;
    const token = await this.userService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  }

  @Post("activate")
  async activate(@Req() req, @Res() res, @Next() next) {
    const activationLink = req.params.link;
    await this.userService.activate(activationLink);

    return res.redirect(process.env.CLIENT_URL);
  }

  @Post("refresh")
  async refresh(@Req() req, @Res() res, @Next() next) {
    const { refreshToken } = req.cookies;
    const userData = await this.userService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    return res.json(userData);
  }
}
