import {Component, Input} from '@angular/core';

@Component({
  selector: 'stock-counter',
  styleUrls: ['./stock-counter.component.scss'],
  template: `
    <div>
      <div class="stock-counter">
        <div>
          <p>{{ value }}</p>
          <div>
            <button type="button" (click)="increment()">
              +
            </button>
            <button type="button" (click)="decrement()">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StockCounterComponent {
  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  value: number = 10;

  increment(): void {
    if (this.value < this.max) {
      this.value += this.step;
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      this.value -= this.step;
    }
  }
}
