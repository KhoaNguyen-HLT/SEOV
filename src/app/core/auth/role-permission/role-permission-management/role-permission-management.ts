import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCellComponent } from '../../../../shared/components/action-cell/action-cell';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';
import { PopupService } from '../../../../shared/service/popup.service';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../../../features/user/user.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ChangeDetectorRef } from '@angular/core';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule, GridOptions } from 'ag-grid-community';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { id_ID } from 'ng-zorro-antd/i18n';
ModuleRegistry.registerModules([AllCommunityModule]);

interface Role {
  id: string;
  code: string;
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
    NzPopconfirmModule,
    AgGridAngular,
    NzSelectModule,
    FormsModule
  ],
  templateUrl: './role-permission-management.html',
  styleUrls: ['./role-permission-management.css'],
})
export class RolePermissionManagementComponent {
  roles: any[] = [];
  permission: any[] = [];
  selectedPermissionIds = [] as string[];
  gridApi: any;
  selectedPermission: any;
  isModalVisible = false;
  validateForm!: FormGroup;
  createForm!: FormGroup;
  editingId: string | null = null;
  columnDefs: ColDef[] = [
    {
      headerName: 'id',
      field: 'id',
      width: 50,
      sortable: true,

    },
    {
      headerName: 'Mã vai trò',
      field: 'code',
      width: 200,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Tên vai trò',
      field: 'name',
      width: 200,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Permissions',
      field: 'permissions',
      width: 500,
      filter: CheckboxFilterComponent,
      valueGetter: params =>
        params.data.permissions?.map((p: any) => p.code).join(', ') ?? ''
    }
    ,
    {
      headerName: 'Update vai trò',
      field: 'action',
      cellRenderer: ActionCellComponent,
      width: 200,
      autoHeight: true,
      cellRendererParams: {
        showOpen: false,
        showView: false,
        showEdit: false,
        showDelete: false,
        showUpdateRole: true
      }
    }
  ];

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.roles);
  }


  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef
    , private PopupService: PopupService, private UserService: UserService
  ) {

  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      code: [null],
      name: [null],
      description: [null]
    });

    this.createForm = this.fb.group({
      code: [null],
      name: [null],
      description: [null]
    });

    this.getAllRoles();
    this.getAllPermissions();
  }

  getAllRoles() {
    this.authService.getAllRoles().subscribe((res: any) => {
      this.roles = res[0];
      this.gridApi.setGridOption('rowData', this.roles);
      console.log('Roles:', this.roles);
    });

  }

  getAllPermissions() {
    this.authService.GetAllPermissions().subscribe((res: any) => {
      this.permission = res[0];
      console.log('Permissions:', this.permission);
    });

  }



  onUpdateRole(row: any) {
    this.selectedPermission = row;
    this.currentRow = row;

    this.selectedPermissionIds = this.selectedPermission.permissions?.map((permission: any) => permission.id) ?? [];
    this.isUpdateModalVisible = true;
  }

  isUpdateModalVisible = false;
  editForm!: FormGroup;
  currentRow: any;

  updateHandleCancel() {
    this.isUpdateModalVisible = false;
  }
  updateHandleOk() {
    if (this.editForm.invalid) return;

    const payload = {
      roleId: this.currentRow.id,
      permissionIds: this.selectedPermissionIds
    };

    // 👉 gọi API update
    this.authService.UpdateRolePermission(payload).subscribe((res: any) => {
      if (res.message === 'success') {
        this.PopupService.success('Cập nhật vai trò thành công');
        this.getAllRoles();
        this.isUpdateModalVisible = false;
      } else {
        this.PopupService.error('Cập nhật thất bại');
      }
    });

    this.isUpdateModalVisible = false;
  }







}
