import {
  QuestionCreateDTO,
  QuestionUpdateDTO,
} from "../../interfaces/Question";
import GenericController from "../generic.controller";

const devServerUri = "http://localhost:5007";
const prodServerUri = "https://question-service-qzxsy455sq-as.a.run.app";

class QuestionController extends GenericController {
  constructor() {
    super(
      window.location.hostname !== "localhost" ? prodServerUri : devServerUri,
      "api",
    );
  }

  public async createQuestion(data: QuestionCreateDTO) {
    try {
      return await this.post("question", data);
    } catch (error) {
      return null;
    }
  }

  public async readQuestions() {
    try {
      return await this.get("question");
    } catch (error) {
      return null;
    }
  }

  public async updateQuestion(id: number, data: QuestionUpdateDTO) {
    try {
      return await this.put(`question/${id}`, data);
    } catch (error) {
      return null;
    }
  }

  public async deleteQuestion(id: number) {
    try {
      return await this.delete(`question/${id}`);
    } catch (error) {
      return null;
    }
  }
}

export default QuestionController;
