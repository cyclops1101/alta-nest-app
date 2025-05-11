import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}
