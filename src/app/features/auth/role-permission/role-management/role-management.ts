import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

interface Role {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzSpaceModule,
    NzPopconfirmModule
  ],
  templateUrl: './role-management.html',
  styles: [`
    .header-actions {
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class RoleManagementComponent {
  roles: Role[] = [
    { id: '1', name: 'Admin', description: 'Quản trị viên hệ thống' },
    { id: '2', name: 'Manager', description: 'Quản lý' },
    { id: '3', name: 'User', description: 'Người dùng phổ thông' }
  ];

  isModalVisible = false;
  validateForm!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
  }

  showCreateModal(): void {
    this.editingId = null;
    this.validateForm.reset();
    this.isModalVisible = true;
  }

  showEditModal(role: Role): void {
    this.editingId = role.id;
    this.validateForm.patchValue({
      name: role.name,
      description: role.description
    });
    this.isModalVisible = true;
  }

  deleteRole(id: string): void {
    this.roles = this.roles.filter(r => r.id !== id);
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      if (this.editingId) {
        // Edit mode
        const index = this.roles.findIndex(r => r.id === this.editingId);
        if (index > -1) {
          this.roles[index] = { ...this.roles[index], ...formValue };
          this.roles = [...this.roles];
        }
      } else {
        // Create mode
        const newRole: Role = {
          id: (this.roles.length + 1).toString(),
          name: formValue.name,
          description: formValue.description || ''
        };
        this.roles = [...this.roles, newRole];
      }
      this.isModalVisible = false;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
