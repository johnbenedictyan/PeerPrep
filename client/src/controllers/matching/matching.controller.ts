import GenericController from "../generic.controller";

interface ICreateMatchingRequest {
  userId: string;
  difficulty: string;
  questionId?: string;
}

interface ICancelMatchingRequest {
  userId: string;
}

const devServerUri = "http://localhost:5007";
const prodServerUri = "https://matching-service-qzxsy455sq-as.a.run.app";

class MatchingController extends GenericController {
  constructor() {
    super(
      window.location.hostname !== "localhost" ? prodServerUri : devServerUri,
      "api",
    );
  }

  public async cancelMatchingRequest(data: ICancelMatchingRequest) {
    try {
      return await this.post("matchingRequest/cancel", data);
    } catch (error) {
      return null;
    }
  }

  public async createMatchingRequest(data: ICreateMatchingRequest) {
    try {
      return await this.post("matchingRequest", data);
    } catch (error) {
      return null;
    }
  }
}

export default MatchingController;
