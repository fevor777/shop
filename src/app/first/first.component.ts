import { Component, Inject, Optional } from '@angular/core';

import { ConfigOptionsService } from '../core/services/config-options.service';
import { ConstantsService } from '../core/services/constant.service';
import { GenIdFactory } from '../core/services/gen-id.factory';
import { generatedIds } from '../core/services/gen-id.generator';
import { GeneratorService } from '../core/services/generator';
import { generatedString, generatedStringV2, GeneratorFactory } from '../core/services/generator.factory';
import { LocalStorageService, localStorageServiceInstance } from '../core/services/local-storage.service';
import { StorageService } from '../core/services/storage.service';
import { SelectionDirective } from '../shared/directive/selection.directive';
import { Category } from './category';

export const taskConstantsService: ConstantsService  = {
  App: 'TaskManager',
  Ver: '1.0',
  API_URL: 'http://...'
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
  providers: [
    { provide: ConstantsService, useValue: taskConstantsService },
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
    { provide: generatedStringV2, useExisting: generatedString },
    { provide: generatedIds, useFactory: GenIdFactory(10), deps: [GeneratorService], multi: true },
    { provide: generatedIds, useFactory: GeneratorFactory(10), deps: [GeneratorService], multi: true },
    { provide: LocalStorageService, useValue: localStorageServiceInstance },
    { provide: StorageService, useClass: LocalStorageService },
  ],
  imports: [SelectionDirective],
  standalone: true,
})
export class FirstComponent {
  name: string = 'first component name';
  description: string = 'first component description';
  price: number = 100;
  category: Category = Category.C1;
  isAvailable: boolean = true;

  constructor(@Optional() configOptionsService: ConfigOptionsService,
    @Optional() constantsService: ConstantsService,
    @Inject(generatedString) @Optional() generatedString: string,
    @Inject(generatedStringV2) @Optional() generatedStringV2: string,
    @Inject(generatedIds) @Optional() generatedIds: any[],
    @Optional() generatorService: GeneratorService,
    @Optional() localStorageService: LocalStorageService,
    @Optional() storageService: StorageService) {
      console.log(' ----------- ConfigOptionsService');
      if (configOptionsService) {
        console.log('getConfig(): ', configOptionsService.getConfig());
        configOptionsService.setConfig({email: 'example.com'});
        console.log('setConfig(): ', configOptionsService.getConfig());
        configOptionsService.setConfigProperty('id', 'test id');
        console.log('set id ', configOptionsService.getConfig());
      } else {
        console.log('ConfigOptionsService was not found');
      }
      console.log(' ----------- ');
      if (constantsService) {
        console.log('ConstantsService: ', constantsService);
      } else {
        console.log('ConstantsService was not found');
      }
      console.log(' ----------- ');
      console.log(' -----------');
      if (generatedString) {
        console.log('generated string: ', generatedString);
      } else {
        console.log('generatedString was not found');
      }
      if (generatedStringV2) {
        console.log('generated string v2: ', generatedStringV2);
      } else {
        console.log('generatedStringV2 was not found');
      }
      console.log(' -----------');
      if (generatedIds) {
        console.log('generated IDs: ', generatedIds);
      } else {
        console.log('generated was not found');
      }
      console.log(' ----------- ');
      console.log(' ----------- GeneratorService');
      if (generatorService) {
        console.log('generated string, 15 symbols: ', generatorService.generate(15));
        console.log('generated ID, 15 numbers: ', generatorService.getNewID(15));
      } else {
        console.log('GeneratorService was not found');
      }
      console.log(' ----------- ');
      console.log(' ----------- LocalStorageService');
      if (localStorageService) {
        localStorageService.setItem('key 1', 'value 1');
        console.log('set value: ', localStorageService.getItem('key 1'));
        localStorageService.clear();
        console.log('clear. length:', localStorageService.getLength());
      } else {
        console.log('LocalStorageService was not found');
      }
      console.log(' ----------- ');
      console.log(' ----------- StorageService');
      if (storageService) {
        storageService.setItem('key 1', 'value 1');
        console.log('set value: ', storageService.getItem('key 1'));
        storageService.clear();
        console.log('clear. length:', storageService.getLength());
      } else {
        console.log('StorageService was not found');
      }
      console.log(' ----------- ');
  }
}
