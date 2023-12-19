import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Product} from "../stock-products/stock-products.component";

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div [formGroup]="parent" class="stock-selector">
      <div formGroupName="selector">
        <select formControlName="productId">
          <option value="">Select stock</option>
          <option
            *ngFor="let product of products"
            [value]="product.id">
            {{ product.name }}
          </option>
        </select>
        <input
          type="number"
          step="10"
          min="10"
          max="1000"
          formControlName="quantity">
        <stock-counter
          [step]="10"
          [min]="10"
          [max]="1000">
        </stock-counter>
        <button
          type="button"
          (click)="onAddStock()">
          Add stock
        </button>
      </div>
    </div>
  `,
})
export class StockSelectorComponent {
  @Input() parent!: FormGroup;
  @Input() products!: Product[];

  @Output() added = new EventEmitter<any>();

  onAddStock() {
    this.added.emit(this.parent.get('selector')?.value);
    this.parent.get('selector')?.reset({
      productId: '',
      quantity: 10
    })
  }
}
