import { Injectable } from "@angular/core";
import { genID } from "./gen-id.generator";

@Injectable({
    providedIn: 'root'
})
export class GeneratorService {
    generate(n: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < n; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    getNewID(length: number): number[] {
        return genID(length);
    }

}