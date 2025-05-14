export declare abstract class Factory<T> {
    abstract definition(): T;
    create(overrides?: Partial<T>): T;
    createMany(count: number, overrides?: Partial<T>): T[];
}
