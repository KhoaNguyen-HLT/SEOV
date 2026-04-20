import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

interface PermissionOption {
  label: string;
  value: string;
  checked: boolean;
}

interface ResourcePermission {
  id: string;
  resourceName: string;
  permissions: PermissionOption[];
}

@Component({
  selector: 'app-permission-management1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCheckboxModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './permission-management1.html',
  styles: [`
    .header-actions {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .role-select {
      width: 250px;
    }
    .save-btn {
      margin-top: 20px;
    }
  `]
})
export class PermissionManagementComponent1 {
  roles = [
    { id: '1', name: 'Admin' },
    { id: '2', name: 'Manager' },
    { id: '3', name: 'User' }
  ];

  selectedRole: string = '1';

  resourcePermissions: ResourcePermission[] = [
    {
      id: '1',
      resourceName: 'Quản lý Người Dùng',
      permissions: [
        { label: 'Xem', value: 'read', checked: true },
        { label: 'Thêm', value: 'add', checked: true },
        { label: 'Sửa', value: 'edit', checked: true },
        { label: 'Xóa', value: 'delete', checked: true }
      ]
    },
    {
      id: '2',
      resourceName: 'Quản lý Vai Trò',
      permissions: [
        { label: 'Xem', value: 'read', checked: true },
        { label: 'Thêm', value: 'add', checked: true },
        { label: 'Sửa', value: 'edit', checked: true },
        { label: 'Xóa', value: 'delete', checked: false }
      ]
    },
    {
      id: '3',
      resourceName: 'Đơn Xin Nghỉ Phép',
      permissions: [
        { label: 'Xem', value: 'read', checked: true },
        { label: 'Thêm', value: 'add', checked: false },
        { label: 'Sửa', value: 'edit', checked: false },
        { label: 'Xóa', value: 'delete', checked: false }
      ]
    }
  ];

  constructor(private msg: NzMessageService) { }

  onRoleChange(roleId: string): void {
    // Generate different random fake permissions based on role
    this.resourcePermissions.forEach(resource => {
      resource.permissions.forEach(p => {
        p.checked = roleId === '1' ? true : Math.random() > 0.5;
      });
      // trigger change detection by spreading
      resource.permissions = [...resource.permissions];
    });
  }

  savePermissions(): void {
    // Logic to save
    console.log('Saved Permissions for Role', this.selectedRole, this.resourcePermissions);
    this.msg.success('Đã lưu phân quyền thành công!');
  }
}
