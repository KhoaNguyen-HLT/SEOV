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
import { AuthService } from '../../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { PopupService } from '../../../../shared/service/popup.service';
interface Permission {
  id: string;
  name: string;
  code: string;
}
interface CreatePermission {
  name: string;
  code: string;
}


@Component({
  selector: 'app-permission-management',
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
  templateUrl: './permission-management.html',
  styles: [`
    .header-actions {
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class PermissionManagementComponent {
  permissions: any[] = [];

  isModalVisible = false;
  validateForm!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef
    , private PopupService: PopupService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getAllPermissions();
  }

  getAllPermissions() {
    this.authService.GetAllPermissions().subscribe((res: any) => {
      this.permissions = res[0];
      console.log(this.permissions);
      this.cdr.detectChanges();
    });

  }

  initForm(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });
  }

  showCreateModal(): void {
    this.editingId = null;
    this.validateForm.reset();
    this.isModalVisible = true;
  }

  showEditModal(Permission: Permission): void {
    this.editingId = Permission.id;
    this.validateForm.patchValue({
      name: Permission.name,
      code: Permission.code
    });
    this.isModalVisible = true;
  }

  deleteRole(id: string): void {
    this.permissions = this.permissions.filter(r => r.id !== id);
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      if (this.editingId) {
        // Edit mode
        const index = this.permissions.findIndex(r => r.id === this.editingId);
        if (index > -1) {
          // this.roles[index] = { ...this.roles[index], ...formValue };
          // this.roles = [...this.roles];
          this.authService.UpdatePermission(this.editingId, formValue).subscribe((res: any) => {
            console.log(res);
            if (res.message == "success") {
              this.PopupService.success("Update success");
              this.getAllPermissions();
            } else {
              this.PopupService.error("Update failed");
            }

          });
        }
      } else {
        // Create mode
        const newPermission: CreatePermission = {
          name: formValue.name,
          code: formValue.code || ''
        };
        this.authService.CreatePermission(newPermission).subscribe((res: any) => {
          console.log(res);
          if (res.message == "success") {
            this.PopupService.success("Create success");
            this.getAllPermissions();
          } else {
            this.PopupService.error("Create failed");
          }
        });
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
