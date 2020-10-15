import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { IFormSelectItem } from '@interfaces/form-select-item.inteface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {

  @Output() selectedChange = new EventEmitter<string>();

  @Input() label: string;
  @Input() items: IFormSelectItem[];
  @Input() loading: boolean;
  @Input() selectedItem: string;

  viewLabel: string;
  selectedValue: string;

  ngOnChanges() {
    this.viewLabel = this.loading ? 'loading...' : this.label;

    if (this.selectedItem && this.items.length) {
      this.selectedValue = this.items.find(item => item.value === this.selectedItem).value;
      this.selectedChange.emit(this.selectedValue);
    }
  }

}
