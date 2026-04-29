import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async createUser() {
    return this.prisma.user.create({
      data: {
        email: 'test@example.com',
        password: '123456',
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
