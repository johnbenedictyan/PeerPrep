import GenericController from "../generic.controller";
import { codingLanguage } from "../../context/QuestionContext";

const url = "https://judge0-ce.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "89813d6d5fmsh27bf42e8a3eab33p134acdjsne03c01e99817",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

type CodeInput = {
  source_code: string;
  stdin?: string;
  expected_output?: string;
};

type SingleSubmissionDTO = {
  language_id: number;
} & CodeInput;

type BatchSubmissionDTO = {
  submissions: SingleSubmissionDTO[];
};

type SubmissionParams = {
  wait?: boolean;
  base64_encoded?: boolean;
};

export default class Judge0Controller extends GenericController {
  private judge0LanguageMap: Map<codingLanguage, number>;

  constructor() {
    super(url);
    this.judge0LanguageMap = new Map<codingLanguage, number>([["java", 91]]);
  }

  public about() {
    return this.get("about", headers);
  }

  public getSubmission(token: string) {
    return this.get(`submissions/${token}`, headers);
  }

  public getBatchSubmission(tokens: string[]) {
    return this.get(
      "submissions",
      {
        tokens,
      },
      headers,
    );
  }

  public getLanguage(languageCode: number) {
    return this.get(`languages/${languageCode}`, headers);
  }

  public getLanguages() {
    return this.get("languages", headers);
  }

  public getStatuses() {
    return this.get("statuses", headers);
  }

  public getConfiguration() {
    return this.get("config_info", headers);
  }

  public postSubmission(languageCode: codingLanguage, codeInput: CodeInput) {
    const data: SingleSubmissionDTO = {
      language_id: this.judge0LanguageMap.get(languageCode)!,
      ...codeInput,
    };
    const params: SubmissionParams = {
      base64_encoded: true,
    };
    return this.post("submissions", data, params);
  }

  public postBatchSubmission(
    languageCode: codingLanguage,
    codeInputs: CodeInput[],
  ) {
    const data: BatchSubmissionDTO = {
      submissions: codeInputs.map((x) => ({
        language_id: this.judge0LanguageMap.get(languageCode)!,
        ...x,
      })),
    };
    const params: SubmissionParams = {
      base64_encoded: true,
    };
    return this.post("submissions/batch", data, params);
  }
}
