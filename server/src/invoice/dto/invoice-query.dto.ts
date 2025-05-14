import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { Prisma } from '@/generated-client';

export class InvoiceQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  cursor?: Prisma.InvoiceWhereUniqueInput;

  @IsOptional()
  where?: Prisma.InvoiceWhereInput;

  @IsOptional()
  orderBy?: Prisma.InvoiceOrderByWithRelationInput;
}
