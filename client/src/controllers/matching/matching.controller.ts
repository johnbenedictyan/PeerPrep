import GenericController from "../generic.controller";

interface ICreateMatchingRequest {
  userId: string;
  difficulty: string;
  questionId?: string;
}

class MatchingController extends GenericController {
  constructor() {
    super("http://localhost:5002", "api");
  }

  public async createMatchingRequest(data: ICreateMatchingRequest) {
    return await this.post("matchingRequest", data);
  }

  public async successfulMatching() {
    console.log("successfulMatching");
  }

  public async unsuccessfulMatching() {
    console.log("unsuccessfulMatching");
  }
}

export default MatchingController;
