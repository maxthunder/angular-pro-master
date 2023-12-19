import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item, Product} from "../../components/stock-products/stock-products.component";

@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {

  private _HOST_URL: string = 'http://localhost:3000';

  constructor(private _http: HttpClient) {
  }

  getCartItems(): Observable<Item[]> {
    return this._http.get<Item[]>(`${this._HOST_URL}/cart`);
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._HOST_URL}/products`);
  }
}
