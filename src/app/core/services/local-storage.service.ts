import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService {
    override getItem(key: string): any {
        return window.localStorage.getItem(key);
    }

    override setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    override clear(): void {
        localStorage.clear();
    }

    override removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    override getKey(index: number): void {
        localStorage.key(index);
    }

    override getLength(): number {
        return localStorage.length;
    }
}

export const localStorageServiceInstance = new LocalStorageService();