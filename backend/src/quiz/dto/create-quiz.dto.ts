export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export class CreateQuestionDto {
  text: string;
  type: QuestionType;
  options?: string[];
}

export class CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
