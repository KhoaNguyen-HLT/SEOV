import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface UserRole {
  userId: string;
  username: string;
  email: string;
  roleIds: string[];
}

@Component({
  selector: 'app-user-role-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzButtonModule,
    NzTagModule
  ],
  templateUrl: './user-role-management.html',
  styles: [`
    .roles-select {
      width: 100%;
    }
  `]
})
export class UserRoleManagementComponent {
  availableRoles = [
    { id: '1', name: 'Admin', color: 'red' },
    { id: '2', name: 'Manager', color: 'blue' },
    { id: '3', name: 'User', color: 'green' }
  ];

  users: UserRole[] = [
    { userId: 'u1', username: 'john_doe', email: 'john@example.com', roleIds: ['1', '3'] },
    { userId: 'u2', username: 'jane_smith', email: 'jane@example.com', roleIds: ['2'] },
    { userId: 'u3', username: 'peter_pan', email: 'peter@example.com', roleIds: ['3'] }
  ];

  isModalVisible = false;
  editingUser: UserRole | null = null;
  selectedRoleIds: string[] = [];

  getRoleName(roleId: string): string {
    const role = this.availableRoles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown';
  }

  getRoleColor(roleId: string): string {
    const role = this.availableRoles.find(r => r.id === roleId);
    return role ? role.color : 'default';
  }

  showEditModal(user: UserRole): void {
    this.editingUser = user;
    this.selectedRoleIds = [...user.roleIds];
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.editingUser) {
      this.editingUser.roleIds = [...this.selectedRoleIds];
    }
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
