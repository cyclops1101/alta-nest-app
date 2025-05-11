import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
