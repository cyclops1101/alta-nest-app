export function createPrismaResourceMock<T extends Record<string, any>>(
  mockArray: T[],
): {
  findMany: jest.Mock<Promise<T[]>, []>;
  findUnique: jest.Mock<Promise<T>, []>;
  create: jest.Mock<Promise<T>, []>;
  update: jest.Mock<Promise<T>, []>;
  delete: jest.Mock<Promise<T>, []>;
} {
  const mock = mockArray[0];
  return {
    findMany: jest.fn<Promise<T[]>, []>().mockResolvedValue(mockArray),
    findUnique: jest.fn<Promise<T>, []>().mockResolvedValue(mock),
    create: jest.fn<Promise<T>, []>().mockResolvedValue(mock),
    update: jest.fn<Promise<T>, []>().mockResolvedValue(mock),
    delete: jest.fn<Promise<T>, []>().mockResolvedValue(mock),
  };
}
