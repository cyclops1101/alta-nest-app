export declare function createPrismaResourceMock<T extends Record<string, any>>(mockArray: T[]): {
    findMany: jest.Mock<Promise<T[]>, []>;
    findUnique: jest.Mock<Promise<T>, []>;
    create: jest.Mock<Promise<T>, []>;
    update: jest.Mock<Promise<T>, []>;
    delete: jest.Mock<Promise<T>, []>;
};
