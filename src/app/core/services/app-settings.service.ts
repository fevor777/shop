import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';

import { AppSettings } from '../model/app-settings';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  settingsFile: string = '../../../assets/app-settings.json';

  constructor(
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient
  ) { }

  getAppSettings(key: string): Observable<AppSettings | null> {
    const setting = this.getAppSettingsFromLocalStorage(key);
    if (!setting) {
      return this.getAppSettingsFromFile(key)
        .pipe(
          tap(s => this.setAppSettings(s, key)),
          catchError((e) => {
            console.log(e);
            return of(null);
          })
        );
    }
    return of(setting);
  }

  setAppSettings(settings: AppSettings, key: string): void {
    this.localStorageService.setItem(key, JSON.stringify(settings));
  }

  private getAppSettingsFromLocalStorage(key: string): AppSettings {
    const settings = this.localStorageService.getItem(key);
    return settings ?? JSON.parse(settings);
  }

  private getAppSettingsFromFile(key: string): Observable<AppSettings> {
    return this.httpClient
      .get<{ [name: string]: AppSettings}>(this.settingsFile)
      .pipe(
          retry({ count: 2, delay: 1000 }), 
          catchError(this.handleError),
          map(s => {
            if (s && s[key] && s[key].key && s[key].isAscOrder != null) {
              return s[key];
            } else {
              throw new Error('Data don\'t find');
            }
          })
        );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
