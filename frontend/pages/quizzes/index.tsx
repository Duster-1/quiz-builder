import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getQuizzes, deleteQuiz } from '../../services/api';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this quiz permanently?')) return;
    await deleteQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <main className="p-6 max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quizzes</h1>

        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + New Quiz
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No quizzes yet.{' '}
          <Link href="/create" className="text-blue-600 underline">
            Create one
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between"
            >
              <div>
                <Link
                  href={`/quizzes/${quiz.id}`}
                  className="text-lg font-semibold text-gray-800 hover:underline"
                >
                  {quiz.title}
                </Link>
                <p className="text-gray-500 text-sm">{quiz.questionCount} questions</p>
              </div>

              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-500 hover:text-red-700 transition font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
