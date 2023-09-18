import { PrismaClient } from "@prisma/client";

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

  public async createSubmission(body: any) {
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

  public async updateSubmission(id: number | undefined, body: any) {
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
