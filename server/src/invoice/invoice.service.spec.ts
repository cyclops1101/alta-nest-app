import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from '@/invoice/invoice.service';
import { PrismaService } from '@/prisma.service';
import { Invoice } from '@/generated-client';
import { InvoiceFactory } from '@/invoice/invoice.factory';
import { createPrismaResourceMock } from '../../test/utils/prisma.mock';

const invoiceFactory = new InvoiceFactory();
const mockInvoices: Invoice[] = invoiceFactory.createMany(5);
const mockInvoice = mockInvoices[0];

const db = {
  invoice: createPrismaResourceMock(mockInvoices),
};

describe('InvoiceService', () => {
  let service: InvoiceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of invoices', async () => {
    const result = await service.findMany({});

    expect(result).toEqual(mockInvoices);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.invoice.findMany).toHaveBeenCalledWith({});
  });

  it('should return a single invoice', async () => {
    const result = await service.findUnique({ id: 1 });

    expect(result).toEqual(mockInvoice);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.invoice.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should create an invoice', async () => {
    const mockInvoiceCreateInput = {
      amount: mockInvoice.amount,
      vendor_name: mockInvoice.vendor_name,
      due_date: mockInvoice.due_date,
      description: mockInvoice.description,
      paid: mockInvoice.paid,
      user: {
        connect: { id: mockInvoice.user_id },
      },
    };
    const result = await service.create(mockInvoiceCreateInput);

    expect(result).toEqual(mockInvoice);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.invoice.create).toHaveBeenCalledWith({
      data: mockInvoiceCreateInput,
    });
  });

  it('should update an invoice', async () => {
    const result = await service.update({
      where: { id: 1 },
      data: mockInvoice,
    });

    expect(result).toEqual(mockInvoice);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.invoice.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockInvoice,
    });
  });

  it('should delete an invoice', async () => {
    const result = await service.delete({ id: 1 });

    expect(result).toEqual(mockInvoice);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.invoice.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
