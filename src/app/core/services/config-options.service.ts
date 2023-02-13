import { Injectable } from '@angular/core';

import { ConfigModel } from '../model/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private config?: ConfigModel;

  getConfig(): ConfigModel | undefined {
    return this.config;
  }

  setConfig(newConfig: Partial<ConfigModel>): void {
    if (newConfig) {
      this.config = { ...newConfig } as ConfigModel;
    } else {
      this.config = newConfig;
    }
  }

  setConfigProperty(key: keyof ConfigModel, value: any): void {
    if (this.config) {
      if (key) {
        this.config = {
          ...this.config,
          [key]: value
        }
      }
    } else {
      this.setConfig({[key]: value});
    }

  }

}
