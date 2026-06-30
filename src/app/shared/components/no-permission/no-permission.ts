import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-no-permission',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './no-permission.html',
  styleUrl: './no-permission.css'
})
export class NoPermissionComponent {

  constructor(private location: Location, private modal: NzModalService) { }

  goBack(): void {
    this.location.back();
  }

  requestPermission(): void {
    this.modal.info({
      nzTitle: '🔐 Chưa được cấp quyền',
      nzContent: `
      <p>Bạn hiện chưa có quyền truy cập chức năng này.</p>
      <br>
      <p>📞 Vui lòng liên hệ:</p>
      <ul>
        <li>Mr-Khoa bộ phận IT(<b>Tel: 268</b>)</li>
      </ul>
      <p>để được cấp quyền phù hợp.</p>
    `,
      nzOkText: 'Đã hiểu'
    });
  }
}