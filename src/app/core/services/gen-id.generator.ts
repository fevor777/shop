import { InjectionToken } from "@angular/core";

export const generatedIds = new InjectionToken<string>('generate id');

export const genID = (length: number): number[] => {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * 10));
    }
    return sequence;
}