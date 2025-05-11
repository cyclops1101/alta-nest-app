import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Invoice, Prisma } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    return this.prisma.invoice.findMany(params);
  }

  async findOne(
    where: Prisma.InvoiceWhereUniqueInput,
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({ where });
  }

  async create(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.invoice.create({ data });
  }

  async update(params: {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.InvoiceUpdateInput;
  }): Promise<Invoice | null> {
    return this.prisma.invoice.update(params);
  }

  async remove(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice | null> {
    return this.prisma.invoice.delete({ where });
  }
}
