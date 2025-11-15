Quiz Builder – Full-Stack Assessment Project
A full-stack quiz creation platform built with NestJS, Prisma, PostgreSQL, Next.js, and TailwindCSS.
Users can create quizzes, add different types of questions, view all quizzes, open each quiz in detail, and delete quizzes.

quiz-builder/
├── backend/ # NestJS + Prisma API
└── frontend/ # Next.js UI (Pages Router)

Features
Create quizzes with:
Boolean questions
Input (short text) questions
Checkbox (multiple choice) questions
List all quizzes
View quiz details
Delete quiz
Responsive UI
Prisma ORM with PostgreSQL
Cascade delete for questions
ESLint + Prettier support

Technologies
Backend: NestJS, Prisma, PostgreSQL, TypeScript
Frontend: Next.js, React, TailwindCSS, TypeScript

Quiz (1) ─── (∞) Question

model Quiz {
id Int @id @default(autoincrement())
title String
createdAt DateTime @default(now())
questions Question[]
}

model Question {
id Int @id @default(autoincrement())
quiz Quiz @relation(fields: [quizId], references: [id], onDelete: Cascade)
quizId Int
type QuestionType
text String
options Json?
}

enum QuestionType {
BOOLEAN
INPUT
CHECKBOX
}

Backend Setup
Install dependencies

cd backend
npm install

Create .env (copy from .env.example)

DATABASE_URL="postgresql://postgres:password@localhost:5432/quizdb"
PORT=4000

Run migrations

npx prisma migrate dev

Start backend

npm run start:dev

Backend runs at: http://localhost:4000

Frontend Setup
Install dependencies

cd frontend
npm install

Create .env.local (copy from .env.example)
NEXT_PUBLIC_API_URL=http://localhost:4000

Start frontend
npm run dev

Frontend runs at: http://localhost:3000

API Endpoints
| Method | Endpoint | Description |
| ------ | -------------- | ----------------------- |
| POST | `/quizzes` | Create quiz |
| GET | `/quizzes` | Get all quizzes |
| GET | `/quizzes/:id` | Get quiz by ID |
| DELETE | `/quizzes/:id` | Delete quiz + questions |

Creating Sample Quiz
Start backend & frontend
Go to http://localhost:3000/create
Enter title
Add questions
Save
View quizzes at /quizzes

Code Quality

Format code

npm run format

Lint

npm run lint

Both backend and frontend include:
.eslintrc
.prettierrc

Production Build

npm run build
npm run start:prod

Frontend

npm run build
npm start

Project Structure
quiz-builder/
├── backend/
│ ├── src/
│ ├── prisma/
│ ├── .env.example
│ └── package.json
└── frontend/
├── pages/
├── components/
├── styles/
├── .env.example
└── package.json

Done!
