import { faker } from '@faker-js/faker';
import { User } from '@/generated-client';
import { Factory } from '../../test/factories/base.factory';

export class UserFactory extends Factory<User> {
  definition(): User {
    return {
      id: faker.number.int({ min: 1, max: 10000 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
