export abstract class Factory<T> {
  abstract definition(): T;

  create(overrides: Partial<T> = {}): T {
    return { ...this.definition(), ...overrides };
  }

  createMany(count: number, overrides: Partial<T> = {}): T[] {
    return Array.from({ length: count }).map(() => this.create(overrides));
  }
}
