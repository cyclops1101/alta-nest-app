"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrismaResourceMock = createPrismaResourceMock;
function createPrismaResourceMock(mockArray) {
    const mock = mockArray[0];
    return {
        findMany: jest.fn().mockResolvedValue(mockArray),
        findUnique: jest.fn().mockResolvedValue(mock),
        create: jest.fn().mockResolvedValue(mock),
        update: jest.fn().mockResolvedValue(mock),
        delete: jest.fn().mockResolvedValue(mock),
    };
}
//# sourceMappingURL=prisma.mock.js.map