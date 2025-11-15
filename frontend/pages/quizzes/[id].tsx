import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuiz } from '../../services/api';

export default function QuizDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getQuiz(id as string)
        .then((data) => {
          setQuiz(data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!quiz) return <p className="p-6">Quiz not found</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      {quiz.questions.map((q: any, index: number) => (
        <div key={q.id} className="border p-3 mb-3 rounded">
          <p className="font-semibold mb-2">
            {index + 1}. {q.text}
          </p>

          {q.type === 'BOOLEAN' && (
            <p className="text-gray-600 text-sm">Answer type: True / False</p>
          )}

          {q.type === 'INPUT' && <p className="text-gray-600 text-sm">Answer type: Short text</p>}

          {q.type === 'CHECKBOX' && (
            <>
              <p className="text-gray-600 text-sm mb-1">Possible answers:</p>
              <ul className="pl-6 list-disc text-sm">
                {q.options.map((opt: string, idx: number) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </main>
  );
}
