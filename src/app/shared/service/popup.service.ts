import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private message: NzMessageService) {}

  success(msg: string) {
    this.message.success(msg, {
      nzDuration: 3000,
      nzClass: 'custom-success',
    });
  }

  error(msg: string) {
    this.message.error(msg, {
      nzDuration: 3000,
      nzClass: 'custom-error',
    });
  }
}
