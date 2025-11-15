import { useState } from 'react';
import { useRouter } from 'next/router';
import { createQuiz, QuestionType } from '../services/api';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<
    { text: string; type: QuestionType; options: string[] }[]
  >([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'BOOLEAN', options: [] }]);
  };

  const updateQuestion = (i: number, field: string, value: any) => {
    const copy = [...questions];
    // @ts-ignore
    copy[i][field] = value;
    setQuestions(copy);
  };

  const addOption = (i: number) => {
    const copy = [...questions];
    copy[i].options.push('');
    setQuestions(copy);
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    const copy = [...questions];
    copy[qi].options[oi] = value;
    setQuestions(copy);
  };

  const removeQuestion = (i: number) => {
    setQuestions(questions.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    await createQuiz({ title, questions });
    router.push('/quizzes');
  };

  return (
    <main className="p-6 max-w-2xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Quiz</h1>

      {/* Title input */}
      <div className="bg-white shadow-sm border rounded-xl p-4 mb-6">
        <label className="font-semibold text-gray-700">Quiz Title</label>
        <input
          className="border mt-1 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter quiz title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Add question button */}
      <button
        onClick={addQuestion}
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Add Question
      </button>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="bg-white border shadow-sm rounded-xl p-5 relative">
            {/* Remove question */}
            <button
              onClick={() => removeQuestion(i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>

            <label className="font-semibold text-gray-700">Question Text</label>
            <input
              className="border mt-1 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter question..."
              value={q.text}
              onChange={(e) => updateQuestion(i, 'text', e.target.value)}
            />

            <label className="font-semibold text-gray-700">Question Type</label>
            <select
              className="border mt-1 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={q.type}
              onChange={(e) => updateQuestion(i, 'type', e.target.value)}
            >
              <option value="BOOLEAN">Boolean (True/False)</option>
              <option value="INPUT">Input (Short answer)</option>
              <option value="CHECKBOX">Checkbox (Multiple choice)</option>
            </select>

            {/* Checkbox options */}
            {q.type === 'CHECKBOX' && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="font-semibold text-gray-700 mb-2">Options</p>

                {q.options.map((opt, oi) => (
                  <input
                    key={oi}
                    className="border p-3 w-full rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, oi, e.target.value)}
                  />
                ))}

                <button
                  onClick={() => addOption(i)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        onClick={handleSubmit}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-xl transition text-lg"
      >
        Save Quiz
      </button>
    </main>
  );
}
