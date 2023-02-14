import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../model/select-option';

@Component({
    selector: 'app-order-by',
    templateUrl: './order-by.component.html',
    styleUrls: ['./order-by.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class OrderByComponent {

    @Input() keys: SelectOption[] = [];
    @Output() keyChange: EventEmitter<SelectOption> = new EventEmitter();
    @Output() sortOrderChange: EventEmitter<boolean> = new EventEmitter();

    onKeyChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.keyChange.emit(this.keys?.find((k) => k?.id === value));
    }

    onSortOrderChange(event: Event): void {
        this.sortOrderChange.emit((event.target as HTMLInputElement).checked);
    }
}