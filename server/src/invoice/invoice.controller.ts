import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice, Prisma } from '@/generated-client';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { JwtUser } from '@/auth/types/jwt-user.type';
import { InvoiceQueryDto } from '@/invoice/dto/invoice-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @CurrentUser() user: JwtUser,
    @Query() query: InvoiceQueryDto,
  ): Promise<Invoice[]> {
    const { skip, take, cursor, where, orderBy } = query;
    return this.invoiceService.findMany({
      where: {
        ...where,
        user_id: user.id,
      },
      skip,
      take,
      cursor,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.findUnique(pid);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Prisma.InvoiceUpdateInput) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.update({ where: pid, data });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const pid: Prisma.InvoiceWhereUniqueInput = { id };
    return this.invoiceService.delete(pid);
  }
}
