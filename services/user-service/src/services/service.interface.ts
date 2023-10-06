import { OptionalInterface } from "../util/optionalInterface";

interface Service<CreateDTO, UpdateDTO, Obj> {
  create(body: CreateDTO): Promise<Obj>;
  findById(id: number): Promise<Obj | null>;
  findOne(body: OptionalInterface<Obj>): Promise<Obj | null>;
  findAll(): Promise<Obj[]>;
  update(id: number, body: UpdateDTO): Promise<Obj>;
  delete(id: number): Promise<Obj>;
}

export default Service;
