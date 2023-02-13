import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator';

export const generatedNumbers = new InjectionToken<number[]>('random numbers')

export function GenIdFactory(n: number): (generatorService: GeneratorService) => number[] {
    return (generatorService: GeneratorService): number[] => generatorService.getNewID(n);
} {

}