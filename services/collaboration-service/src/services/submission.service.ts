import { PrismaClient } from "@prisma/client";
import { SubmissionCreateDTO } from "../interfaces/submissionCreate.interface";
import { SubmissionUpdateDTO } from "../interfaces/submissionUpdate.interface";

class SubmissionService {
  //   private producer: CollaborationEventProducer;
  private prismaClient: PrismaClient;

  constructor(
    // producer: CollaborationEventProducer,
    prismaClient: PrismaClient
  ) {
    // this.producer = producer;
    this.prismaClient = prismaClient;
  }

  public async createSubmission(body: SubmissionCreateDTO) {
    return await this.prismaClient.submission.create({
      data: body,
    });
  }

  public async getSubmission(id: number | undefined) {
    if (!id) throw new Error("No id provided");
    return await this.prismaClient.submission.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async getSubmissions() {
    return await this.prismaClient.submission.findMany();
  }

  public async updateSubmission(
    id: number | undefined,
    body: SubmissionUpdateDTO
  ) {
    if (!id) throw new Error("No id provided");
    return await this.prismaClient.submission.update({
      where: {
        id: id,
      },
      data: body,
    });
  }

  public async deleteSubmission(id: number | undefined) {
    if (!id) throw new Error("No id provided");
    return await this.prismaClient.submission.delete({
      where: {
        id: id,
      },
    });
  }
}

export default SubmissionService;
