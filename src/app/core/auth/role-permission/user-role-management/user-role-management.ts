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
  templateUrl: './user-role-management.html',
  styleUrls: ['./user-role-management.css'],
})
export class UserRoleManagementComponent {
  roles: any[] = [];
  users: any[] = [];
  selectedRoleIds = [] as string[];
  gridApi: any;
  selectedUser: any;
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
      headerName: 'UserName',
      field: 'username',
      width: 200,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Tên người dùng',
      field: 'name',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Roles',
      field: 'roles',
      width: 500,
      filter: CheckboxFilterComponent,
      valueGetter: params =>
        params.data.roles?.map((r: any) => r.code).join(', ') ?? ''

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
    this.gridApi.setGridOption('rowData', this.users);
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
    setTimeout(() => {
      this.getAllRoles();
      this.getAllUsers();
    }, 0);

  }

  getAllRoles() {
    this.authService.getAllRoles().subscribe((res: any) => {
      this.roles = res[0];
    });

  }

  getAllUsers() {
    this.UserService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.gridApi.setGridOption('rowData', res);
    });

  }



  onUpdateRole(row: any) {
    this.selectedUser = row;
    this.currentRow = row;

    this.selectedRoleIds = this.selectedUser.roles?.map((role: any) => role.id) ?? [];
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
      userId: this.currentRow.id,
      roleIds: this.selectedRoleIds
    };

    // 👉 gọi API update
    this.UserService.updateUserRole(payload).subscribe((res: any) => {
      if (res.message === 'success') {
        this.PopupService.success('Cập nhật vai trò thành công');
        this.getAllUsers();
        this.isUpdateModalVisible = false;
      } else {
        this.PopupService.error('Cập nhật thất bại');
      }
    });

    this.isUpdateModalVisible = false;
  }



  handleOk(): void {
    this.isModalVisible = true;
  }


  handleCancel(): void {
    this.isModalVisible = false;
  }




}
