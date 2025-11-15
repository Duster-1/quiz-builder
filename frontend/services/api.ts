const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('BASE_URL =', BASE_URL);

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface CreateQuizPayload {
  title: string;
  questions: {
    text: string;
    type: QuestionType;
    options?: string[];
  }[];
}

export async function createQuiz(payload: CreateQuizPayload) {
  const res = await fetch(`${BASE_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create quiz');
  return res.json();
}

export async function getQuizzes() {
  const res = await fetch(`${BASE_URL}/quizzes`);
  return res.json();
}

export async function getQuiz(id: number | string) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);
  return res.json();
}

export async function deleteQuiz(id: number) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
