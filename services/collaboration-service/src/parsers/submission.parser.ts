class SubmissionParser {
  public parseId(id?: string): number | undefined {
    return id ? parseInt(id) : undefined;
  }
}
