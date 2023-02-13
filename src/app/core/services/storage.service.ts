
export abstract class StorageService {
    abstract getItem(key: string): any;

    abstract setItem(key: string, value: string): void;

    abstract clear(): void;

    abstract removeItem(key: string): void;

    abstract getKey(index: number): void;

    abstract getLength(): number;
}
