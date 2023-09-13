export interface IMatchingRequest {
  userId: number;
  dateRequested: Date;
  questionId: number | null;
  difficulty: string;
}

export interface IMatching {
  user1Id: number;
  user2Id: number;
  dateTimeMatched: Date;
}
