"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockBcrypt = void 0;
jest.mock('bcryptjs', () => ({
    compare: jest.fn().mockResolvedValue(true),
    hash: jest.fn().mockResolvedValue('hashed-password'),
}));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mockBcrypt = ({ compare = true, hash = 'hashed-password', }) => {
    bcryptjs_1.default.compare.mockResolvedValue(compare);
    bcryptjs_1.default.hash.mockResolvedValue(hash);
};
exports.mockBcrypt = mockBcrypt;
//# sourceMappingURL=brcypt.mock.js.map