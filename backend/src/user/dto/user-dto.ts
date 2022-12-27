import { UserI } from "../interfaces/user.interface";

export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;
  constructor(model: UserI) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
