import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input
          type="text"
          formControlName="branch"
          placeholder="Branch Id">
        <input
          type="text"
          formControlName="code"
          placeholder="Manager Code">
      </div>
    </div>
  `,
})
export class StockBranchComponent {
  @Input() parent!: FormGroup;
}
