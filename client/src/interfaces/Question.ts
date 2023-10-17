interface Question {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

interface QuestionCreateDTO {
  title: string;
  content: string;
  authorId: string;
}

interface QuestionUpdateDTO {
  title: string;
  content: string;
}

export type { Question, QuestionCreateDTO, QuestionUpdateDTO };
