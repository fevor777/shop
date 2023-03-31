import { ConfigModel } from '../model/config.model';
import { ConfigOptionsService } from './config-options.service';

describe('ConfigOptionsService', () => {
  let service: ConfigOptionsService;
  const config: ConfigModel = { id: 'test-id', email: 'email', login: 'login' };

  beforeEach(() => {
    service = new ConfigOptionsService();
    service['config'] = config;
  });

  it('getConfig() should return config field', () => {
    expect(service.getConfig()).toEqual(config);
  });

  describe('setConfig(newConfig: Partial<ConfigModel>)', () => {
    it('should update all fields', () => {
      const newConfig: ConfigModel = {
        id: 'new test-id',
        email: 'new email',
        login: 'new login',
      };
      service.setConfig(newConfig);
      expect(service.getConfig()).toEqual(newConfig);
    });

    it('should update name', () => {
      const newConfig: Partial<ConfigModel> = { id: 'new test-id' };
      const updatedConfig: ConfigModel = { id: 'new test-id' } as ConfigModel;
      service.setConfig(newConfig);
      expect(service.getConfig()).toEqual(updatedConfig);
    });
  });

  describe('setConfigProperty(key: keyof ConfigModel, value: any): void', () => {
    it('should set id', () => {
      const newConfig: ConfigModel = {
        id: 'new test-id',
        email: 'email',
        login: 'login',
      };
      service.setConfigProperty('id', 'new test-id');
      expect(service.getConfig()).toEqual(newConfig);
    });

    it('should set email', () => {
      const newConfig: ConfigModel = {
        id: 'test-id',
        email: 'new email',
        login: 'login',
      };
      service.setConfigProperty('email', 'new email');
      expect(service.getConfig()).toEqual(newConfig);
    });
  });
});
