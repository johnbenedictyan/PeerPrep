import { User, UserCreateDTO, UserUpdateDTO } from "../../interfaces/User";
import GenericController from "../generic.controller";

class UserController extends GenericController {
  constructor() {
    super("http://localhost:5001", "api");
  }

  createUser(data: UserCreateDTO): Promise<User> {
    return this.post("user", data);
  }

  getUser(id: string): Promise<User> {
    return this.get(`user/${id}`);
  }

  updateUser(id: string, data: Partial<UserUpdateDTO>): Promise<User> {
    return this.put(`user/${id}`, data);
  }

  deleteUser(id: string): Promise<User> {
    return this.delete("user");
  }
}

export default UserController;
