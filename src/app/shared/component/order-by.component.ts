import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppSettings } from '../../core/model/app-settings';

import { AppSettingsService } from '../../core/services/app-settings.service';
import { SelectOption } from '../model/select-option';

@Component({
    selector: 'app-order-by',
    templateUrl: './order-by.component.html',
    styleUrls: ['./order-by.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class OrderByComponent implements OnChanges, OnDestroy {

    @Input() keys: SelectOption[] = [];
    @Input() persistenceKey: string = '';
    @Output() keyChange: EventEmitter<SelectOption> = new EventEmitter();
    @Output() sortOrderChange: EventEmitter<boolean> = new EventEmitter();

    keysForView: SelectOption[] = [];
    ascendingValue: boolean = true;
    settings?: AppSettings;

    private readonly destroy: Subject<void> = new Subject();

    constructor(private appSettingsService: AppSettingsService) {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['keys'] && Array.isArray(this.keys) && this.keys.length > 0) {
            this.keysForView = [ ...this.keys ];
            this.appSettingsService.getAppSettings(this.persistenceKey)
                .pipe(takeUntil(this.destroy))
                .subscribe(settings => this.applyConfig(settings));

        }
    }

    onKeyChange(event: Event): void {
        this.keysForView.forEach((k) => { 
            if (k.selected) {
                k.selected = false;
            }
        });
        const value = (event.target as HTMLSelectElement).value;
        const option = this.keysForView?.find((k) => k?.id === value);
        if (option) {
            let settings;
            if (this.settings) {
                this.settings.key = option;
                settings = this.settings;
            } else {
                settings = { key: option };
            }
            this.appSettingsService.setAppSettings(settings, this.persistenceKey);
            this.keyChange.emit(option);
        }
    }

    onSortOrderChange(event: Event): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        this.sortOrderChange.emit(isChecked);
        let settings;
        if (this.settings) {
            this.settings.isAscOrder = isChecked;
            settings = this.settings;
        } else {
            settings = { isAscOrder: isChecked } as AppSettings;
        }
        this.appSettingsService.setAppSettings(settings, this.persistenceKey);
    }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy.unsubscribe();
  }

  private applyConfig(settings: AppSettings | null): void {
    if (settings) {
        this.keysForView = this.keysForView.map(o => {
            return o.id === settings.key?.id ? { ...o, selected: true } : o;
        });
        this.ascendingValue = settings.isAscOrder ?? true;
        this.settings = { ...settings };
    } else {
        this.settings = { key: this.keysForView[0], isAscOrder: true };
        this.appSettingsService.setAppSettings(this.settings, this.persistenceKey);
    }
  }
}