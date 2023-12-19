import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {StockInventoryComponent} from './containers/stock-inventory/stock-inventory.component';
import {StockBranchComponent} from "../components/stock-branch/stock-branch.component";
import {StockProductsComponent} from "../components/stock-products/stock-products.component";
import {StockSelectorComponent} from "../components/stock-selector/stock-selector.component";
import {HttpClientModule} from "@angular/common/http";
import {StockCounterComponent} from "../components/stock-counter/stock-counter.component";

@NgModule({
  declarations: [
    StockBranchComponent,
    StockCounterComponent,
    StockInventoryComponent,
    StockProductsComponent,
    StockSelectorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {
}
