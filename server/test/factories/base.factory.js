"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
class Factory {
    create(overrides = {}) {
        return { ...this.definition(), ...overrides };
    }
    createMany(count, overrides = {}) {
        return Array.from({ length: count }).map(() => this.create(overrides));
    }
}
exports.Factory = Factory;
//# sourceMappingURL=base.factory.js.map