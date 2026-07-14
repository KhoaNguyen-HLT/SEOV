import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, IDoesFilterPassParams } from 'ag-grid-community';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-checkbox-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule
  ],
  template: `
    <div class="filter-box">

      <input
        nz-input
        class="search-input"
        placeholder="🔍 Tìm kiếm..."
        [(ngModel)]="searchText" />

      <div class="divider"></div>

      <label
        nz-checkbox
        class="checkbox-row check-all"
        [ngModel]="isAllSelected()"
        (ngModelChange)="toggleAll($event)">
        Chọn tất cả
      </label>

      <div class="divider"></div>

      <div class="check-list">
        @for (value of filteredValues; track value) {
          <label
            nz-checkbox
            class="checkbox-row check-item"
            [ngModel]="selectedValues.includes(value)"
            (ngModelChange)="toggleValue(value, $event)">
            {{ value }}
          </label>
        }

        @if (filteredValues.length === 0) {
          <div class="empty-text">
            Không tìm thấy dữ liệu
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    .filter-box {
      width: 185px;
      background: #fff;
      padding: 0;
      box-sizing: border-box;
    }

    .search-input {
      width: 100%;
      height: 32px;
      border-radius: 0;
      box-sizing: border-box;
    }

    .divider {
      height: 1px;
      background: #f0f0f0;
      margin: 0;
    }

    .check-list {
      max-height: 190px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .checkbox-row {
      display: flex !important;
      align-items: center;
      width: 100%;
      height: 34px;
      margin: 0 !important;
      padding: 0 8px !important;
      box-sizing: border-box;
      line-height: 34px;
    }

    .check-all {
      font-weight: 600;
      background: #fafafa;
    }

    .check-item {
      font-size: 13px;
    }

    .check-item:hover {
      background: #f5f7fa;
    }

    .empty-text {
      padding: 12px 8px;
      color: #999;
      font-size: 13px;
      text-align: center;
    }

    :host ::ng-deep .ant-checkbox-wrapper {
      display: flex !important;
      align-items: center;
    }

    :host ::ng-deep .ant-checkbox {
      flex: 0 0 auto;
    }

    :host ::ng-deep .ant-checkbox + span {
      padding-left: 8px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 34px;
    }
  `]
})
export class CheckboxFilterComponent implements IFilterAngularComp {
  private params!: IFilterParams;

  values: string[] = [];
  selectedValues: string[] = [];
  searchText = '';

  agInit(params: IFilterParams): void {
    this.params = params;

    const data: string[] = [];

    params.api.forEachNode(node => {
      const rawValue = params.getValue(node);
      const value = this.convertValue(rawValue);

      if (!data.includes(value)) {
        data.push(value);
      }
    });

    this.values = data.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );

    this.selectedValues = [...this.values];
  }

  get filteredValues(): string[] {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      return this.values;
    }

    return this.values.filter(value =>
      value.toLowerCase().includes(keyword)
    );
  }

  isFilterActive(): boolean {
    return this.selectedValues.length !== this.values.length;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const rawValue = this.params.getValue(params.node);
    const value = this.convertValue(rawValue);

    return this.selectedValues.includes(value);
  }

  getModel(): { values: string[] } | null {
    return this.isFilterActive()
      ? { values: [...this.selectedValues] }
      : null;
  }

  setModel(model: { values: string[] } | null): void {
    this.selectedValues = model?.values
      ? [...model.values]
      : [...this.values];
  }

  toggleValue(value: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedValues.includes(value)) {
        this.selectedValues = [...this.selectedValues, value];
      }
    } else {
      this.selectedValues = this.selectedValues.filter(
        item => item !== value
      );
    }

    this.params.filterChangedCallback();
  }

  toggleAll(checked: boolean): void {
    this.selectedValues = checked
      ? [...this.values]
      : [];

    this.params.filterChangedCallback();
  }

  isAllSelected(): boolean {
    return this.values.length > 0 &&
      this.selectedValues.length === this.values.length;
  }

  private convertValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '(Trống)';
    }

    return String(value);
  }
}