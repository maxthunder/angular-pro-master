import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";

export interface Product {
  id: number,
  price: number,
  name: string
}

export interface Item {
  productId: number,
  quantity: number
}

@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
    <div [formGroup]="parent" class="stock-product">
      <div formArrayName="stock">
        <div *ngFor="let item of stocks; let i = index">
          <div [formGroupName]="i" class="stock-product__content">
            <div class="stock-product__name">
              {{ getProduct(item.value.productId)?.name }}
            </div>
            <div class="stock-product__price">
              {{ getProduct(item.value.productId)?.price | currency:'USD' }}
            </div>
            <input
              type="number"
              step="10"
              min="10"
              max="1000"
              formControlName="quantity">
            <button
              type="button"
              (click)="onRemove(item, i)">
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class StockProductsComponent {
  @Input() parent!: FormGroup;
  @Input() map!: Map<number, Product>;

  @Output() removed = new EventEmitter<any>()

  getProduct(id: number) {
    return this.map.get(id);
  }

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  onRemove(group: AbstractControl, index: number) {
    this.removed.emit({ group, index })
  }
}
