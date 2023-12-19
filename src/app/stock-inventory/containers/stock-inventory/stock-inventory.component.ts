import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Item, Product} from "../../../components/stock-products/stock-products.component";
import {StockInventoryService} from "../../services/stock-inventory.service";
import {forkJoin, map, mapTo, reduce, scan, tap} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency: 'USD' }}
        </div>

        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">Order Stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {
  products!: Product[];
  total!: number;

  productMap!: Map<number, Product>;

  form!: FormGroup;

  constructor(private _fb: FormBuilder, private _stockService: StockInventoryService) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      store: this._fb.group({
        branch: '',
        code: '',
      }),
      selector: this.createStock({}),
      stock: this._fb.array([]),
    });

    const cart = this._stockService.getCartItems();
    const products = this._stockService.getProducts();

    forkJoin([cart, products])
      .subscribe(([cart, products]: [cart: Item[], products: Product[]]) => {
        this.products = products;

        const myMap = products.map<[number, Product]>(product => [product.id, product]);
        this.productMap = new Map<number, Product>(myMap);

        cart.forEach(item => this.addStock(item));

        this.calculateTotal(this.form.get('stock')?.value);
        this.form.get('stock')?.valueChanges
          .subscribe(items => this.calculateTotal(items));
      });
  }

  calculateTotal(value: Item[]): void {
    this.total = value.reduce((acc, next) => acc +
      (this.productMap.get(next.productId)?.price || 0.0) * next.quantity, 0);
    console.log('ello', this.total)
  }

  createStock(stock: any): FormGroup {
    return this._fb.group({
      productId: parseInt(stock.productId) || '',
      quantity: stock.quantity || 10
    })
  }

  onSubmit(): void {
    console.log('submit: ', this.form.value);
  }

  addStock(newStock: any) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(newStock));
  }

  removeStock({group, index}: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }
}
