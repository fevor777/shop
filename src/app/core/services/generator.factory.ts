import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator';

export const generatedString = new InjectionToken<string>('random string');
export const generatedStringV2 = new InjectionToken<string>('random string v2');

export function GeneratorFactory(n: number): (generatorService: GeneratorService) => string {
    return (generatorService: GeneratorService): string => generatorService.generate(n);
} {

}