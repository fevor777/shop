import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Order } from '../models';
import { CustomValidators } from '../validators';
import { EmailDirective } from '../validators/email.directive';

@Component({
  selector: 'app-process-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmailDirective],
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css'],
})
export class ProcessOrderComponent implements OnInit {
  readonly firstNameField: keyof Order = 'firstName';
  readonly lastNameField: keyof Order = 'firstName';
  readonly emailField: keyof Order = 'email';
  readonly phonesField: keyof Order = 'phones';
  readonly pickupField: keyof Order = 'pickup';
  readonly addressField: keyof Order = 'address';

  readonly requiredString: string = 'required';

  placeholder = {
    firstName: `First Name (${this.requiredString})`,
    lastName: 'Last Name',
    email: `Email (${this.requiredString})`,
    phone: 'Phone',
    address: 'Address',
  };

  validationMessagesMap = new Map([
    [
      this.firstNameField,
      {
        message: '',
        required: 'Please enter your first name.',
        isFirstSymbolUppercase: 'The first symbol should be uppercase',
      },
    ],
    [
      this.emailField,
      {
        message: '',
        required: 'Please enter your email address.',
        appEmailValidator: 'Please enter a valid email address.',
      },
    ],
    [
      this.addressField,
      {
        message: '',
        required: 'Please enter your delivery address.',
      },
    ],
  ]);

  orderForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, CustomValidators.isFirstSymbolUppercase],
    ],
    lastName: '',
    email: ['', [Validators.required]],
    phones: this.fb.array([this.buildPhones()]),
    pickup: true,
    address: '',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pickup.valueChanges.subscribe((value) =>
      this.updateAddressValidation(value)
    );
    this.orderForm.valueChanges.subscribe(() => {
      this.validationMessagesMap.forEach((_, name) => {
        this.buildValidationMessages(name);
      });
    });
  }

  get firstName(): AbstractControl {
    return this.orderForm.get(this.firstNameField)!;
  }
  get lastName(): AbstractControl {
    return this.orderForm.get(this.lastNameField)!;
  }
  get email(): AbstractControl {
    return this.orderForm.get(this.emailField)!;
  }
  get phones(): FormArray {
    return this.orderForm.get(this.phonesField) as unknown as FormArray;
  }
  get pickup(): AbstractControl {
    return this.orderForm.get(this.pickupField)!;
  }
  get address(): AbstractControl {
    return this.orderForm.get(this.addressField)!;
  }

  private buildPhones() {
    return this.fb.group({
      phone: '',
    });
  }

  isShowValidationMessage(controlName: keyof Order): boolean {
    return (
      this.validationMessagesMap.get(controlName)!.message &&
      (this as { [index: string]: any })[controlName].touched
    );
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhones());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSave(): void {
    console.log(`Order Form: ${JSON.stringify(this.orderForm.value)}`);
    const order = new Order();
    Object.assign(order, this.orderForm.value);
    console.log(`Order: ${JSON.stringify(order)}`);
  }

  onReset(): void {
    this.orderForm.reset();
    this.orderForm.patchValue({ pickup: true });
    this.phones.clear();
    this.onAddPhone();
  }

  private buildValidationMessages(controlName: keyof Order): void {
    const c: AbstractControl = (this as { [index: string]: any })[controlName];
    this.validationMessagesMap.get(controlName)!.message = '';
    if (c.errors) {
      this.validationMessagesMap.get(controlName)!.message = Object.keys(
        c.errors
      )
        .map((key) => {
          const value = this.validationMessagesMap.get(controlName)!;
          return (value as { [index: string]: any })[key];
        })
        .join(' ');
    }
  }

  private updateAddressValidation(value: boolean): void {
    let addressPlaceholder;
    if (value) {
      addressPlaceholder = 'Address';
      this.address.clearValidators();
    } else {
      addressPlaceholder = `Address (${this.requiredString})`;
      this.address.setValidators(Validators.required);
    }
    this.address.updateValueAndValidity();
    this.placeholder = { ...this.placeholder, address: addressPlaceholder };
  }
}
