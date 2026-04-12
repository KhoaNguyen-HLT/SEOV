
import { UserService } from '../user.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { Component, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsersComponent {

  customers: any[] = [];
    columns = [
    { dataField: 'username', caption: 'Username' },
    { dataField: 'name', caption: 'Name' },
    { dataField: 'email', caption: 'Email' },
    { dataField: 'phone', caption: 'Phone' },
    { dataField: 'fax', caption: 'Fax' }
  ];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    console.log('Gọi hàm lấy danh sách');
    this.userService.getUsers().subscribe({
      next: (res : any[]) => {
        // this.customers = res;
         this.customers = [...res]; 
        console.log('Danh sách người dùng:', res);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
      },
    });
  }


 
}
