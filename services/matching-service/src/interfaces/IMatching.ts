export interface IMatchingRequest {
  userId: number;
  questionId?: number | null;
  difficulty: string;
  dateRequested?: Date | string;
}

export interface ICreatedMatchingRequest extends IMatchingRequest {
  id: number;
}

export interface IMatching {
  user1Id: number;
  user2Id: number;
  dateTimeMatched: Date;
}

export interface ICreatedMatching extends IMatching {
  id: number;
}
