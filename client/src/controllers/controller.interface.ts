abstract class Controller {
  abstract handleCreate(): void;
  abstract handleRead(): void;
  abstract handleUpdate(): void;
  abstract handleDelete(): void;
}

export default Controller;
