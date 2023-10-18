import GenericController from "../generic.controller";

const url = "https://judge0-ce.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "89813d6d5fmsh27bf42e8a3eab33p134acdjsne03c01e99817",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

export class Judge0Controller extends GenericController {
  constructor() {
    super(url);
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
}
