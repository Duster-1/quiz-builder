import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? { options: q.options } : undefined,
          })),
        },
      },
      include: { questions: true },
    });
  }
  

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      questionCount: q._count.questions,
    }));
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    return {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        options: (q.options as any)?.options ?? [],
      })),
    };
  }

  async remove(id: number) {
    await this.prisma.quiz.delete({ where: { id } });
    return { success: true };
  }
}
