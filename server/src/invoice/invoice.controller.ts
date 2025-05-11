import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice, Prisma } from '@prisma/client';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('cursor') cursor: Prisma.InvoiceWhereUniqueInput,
    @Query('where') where: Prisma.InvoiceWhereInput,
    @Query('orderBy') orderBy: Prisma.InvoiceOrderByWithRelationInput,
  ): Promise<Invoice[]> {
    return this.invoiceService.find({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.findOne(pid);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Prisma.InvoiceUpdateInput) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.update({ where: pid, data });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.remove(pid);
  }
}
