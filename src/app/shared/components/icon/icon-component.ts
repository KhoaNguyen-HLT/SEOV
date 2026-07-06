import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { APP_ICONS, AppIconName } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <lucide-icon
      [img]="APP_ICONS[name]"
      [size]="size">
    </lucide-icon>
  `
})
export class AppIconComponent {

  protected readonly APP_ICONS = APP_ICONS;

  @Input({ required: true })
  name!: AppIconName;

  @Input()
  size = 20;

}