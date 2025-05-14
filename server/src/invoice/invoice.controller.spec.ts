import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceFactory } from '@/invoice/invoice.factory';
import { Invoice } from '@/generated-client';
import { InvoiceController } from '@/invoice/invoice.controller';
import { InvoiceService } from '@/invoice/invoice.service';
import { createPrismaResourceMock } from '../../test/utils/prisma.mock';

const invoiceFactory = new InvoiceFactory();
const mockInvoices: Invoice[] = invoiceFactory.createMany(5);
const mockInvoice = mockInvoices[0];

const db = createPrismaResourceMock(mockInvoices);

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: db,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of invoices', async () => {
    const result = mockInvoices;
    jest.spyOn(service, 'findMany').mockResolvedValue(result);

    expect(
      await controller.findAll({ id: 1, email: 'test@test.com' }, {}),
    ).toBe(result);
  });

  it('should return a single invoice', async () => {
    const result = mockInvoice;
    jest.spyOn(service, 'findUnique').mockResolvedValue(result);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create an invoice', async () => {
    const result = mockInvoice;
    jest.spyOn(service, 'create').mockResolvedValue(result);

    const mockInvoiceCreateInput = {
      amount: mockInvoice.amount,
      paid: mockInvoice.paid,
      due_date: mockInvoice.due_date,
      description: mockInvoice.description,
      vendor_name: mockInvoice.vendor_name,
      user: {
        connect: {
          id: mockInvoice.user_id,
        },
      },
    };

    expect(await controller.create(mockInvoiceCreateInput)).toBe(result);
  });

  it('should update an invoice', async () => {
    const result = mockInvoice;
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update(1, mockInvoice)).toBe(result);
  });

  it('should remove an invoice', async () => {
    const result = mockInvoice;
    jest.spyOn(service, 'delete').mockResolvedValue(result);

    expect(await controller.remove(1)).toBe(result);
  });
});
