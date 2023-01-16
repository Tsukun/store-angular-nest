import { UserI } from "../interfaces/user.interface";

export default class UserDto {
  email: string;
  id: string;
  role: string;
  isActivated: boolean;
  constructor(model: UserI) {
    this.email = model.email;
    this.id = model._id;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
}
