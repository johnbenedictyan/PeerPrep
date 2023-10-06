import { PrismaClient } from "@prisma/client";

import { UserCreateDTO } from "../../interfaces/user/createDTO";
import { User, OptionalUser } from "../../interfaces/user/object";
import { UserUpdateDTO } from "../../interfaces/user/updateDTO";
import Service from "../service.interface";
import EventProducer from "../../events/producers/main.interface";

class UserService implements Service<UserCreateDTO, UserUpdateDTO, User> {
  constructor(
    private readonly eventProducer: EventProducer<User>,
    private readonly prismaClient: PrismaClient,
  ) {}

  public async create(body: UserCreateDTO): Promise<User> {
    try {
      const user = await this.prismaClient.user.create({
        data: body,
      });
      return user;
    } catch (error) {
      throw new Error("Failed to create user.");
    }
  }

  public async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Failed to find user.");
    }
  }

  public async findOne(body: OptionalUser): Promise<User | null> {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: body,
      });
      return user;
    } catch (error) {
      throw new Error("Failed to find user.");
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users = await this.prismaClient.user.findMany();
      return users;
    } catch (error) {
      throw new Error("Failed to find users.");
    }
  }

  public async update(id: number, body: UserUpdateDTO): Promise<User> {
    try {
      return await this.prismaClient.user.update({
        where: {
          id,
        },
        data: body,
      });
    } catch (error) {
      throw new Error("Failed to update user.");
    }
  }

  public async delete(id: number): Promise<User> {
    try {
      return await this.prismaClient.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete user.");
    }
  }
}

export default UserService;
