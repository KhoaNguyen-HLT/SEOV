import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-primary',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule],
  templateUrl: './button-primary.html',
  styleUrl: './button-primary.css',
})
export class ButtonPrimary {

  @Input() label: string = 'Button';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

}
