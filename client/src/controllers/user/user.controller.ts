import Controller from "../controller.interface";
import GenericController from "../generic.controller";

class UserController extends GenericController implements Controller {
  constructor() {
    super("http://localhost:5007", "api");
  }

  handleCreate(): void {
    this.post("user", {});
    throw new Error("Method not implemented.");
  }

  handleRead(): void {
    this.get("user");
    throw new Error("Method not implemented.");
  }

  handleUpdate(): void {
    this.put("user", {});
    throw new Error("Method not implemented.");
  }

  handleDelete(): void {
    this.delete("user");
    throw new Error("Method not implemented.");
  }
}

export default UserController;
