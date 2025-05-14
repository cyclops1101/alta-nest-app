import { faker } from '@faker-js/faker';
import { Invoice } from '@/generated-client';
import { Factory } from '../../test/factories/base.factory';

export class InvoiceFactory extends Factory<Invoice> {
  definition(): Invoice {
    return {
      id: faker.number.int({ min: 1, max: 10000 }),
      amount: faker.number.float({ min: 10, max: 1000 }),
      vendor_name: faker.company.name(),
      due_date: faker.date.future(),
      description: faker.lorem.sentence(),
      paid: faker.datatype.boolean(),
      user_id: faker.number.int({ min: 1, max: 100 }),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
