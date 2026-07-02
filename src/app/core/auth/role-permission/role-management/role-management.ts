import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCellComponent } from '../../../../shared/components/action-cell/action-cell';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';
import { PopupService } from '../../../../shared/service/popup.service';
import { AuthService } from '../../service/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { id_ID } from 'ng-zorro-antd/i18n';
ModuleRegistry.registerModules([AllCommunityModule]);

interface Role {
  id: string;
  code: string;
  name: string;
  description: string;
}

interface CreateRole {
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
    AgGridAngular
  ],
  templateUrl: './role-management.html',
  styleUrls: ['./role-management.css'],
})
export class RoleManagementComponent {
  roles: any[] = [];
  gridApi: any;

  isModalVisible = false;
  validateForm!: FormGroup;
  createForm!: FormGroup;
  editingId: string | null = null;
  columnDefs: ColDef[] = [
    {
      headerName: 'id',
      field: 'id',
      width: 200,
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
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Mô tả',
      field: 'description',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    }
    ,
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: ActionCellComponent,
      width: 100,
      autoHeight: true,
      cellRendererParams: {
        showOpen: false,
        showView: false,
        showEdit: true,
        showDelete: true
      }
    }
  ];

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.roles);
  }


  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef
    , private PopupService: PopupService
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
  }

  getAllRoles() {
    this.authService.getAllRoles().subscribe((res: any) => {
      this.roles = res[0];
      if (this.gridApi) {
        this.gridApi.setGridOption('rowData', this.roles);
      }
    });

  }

  onEdit(row: any) {
    console.log('EDIT:', row);
    this.currentRow = row;
    this.editForm.patchValue(row);
    this.isEditModalVisible = true;
  }

  isEditModalVisible = false;
  editForm!: FormGroup;
  currentRow: any;

  editHandleCancel() {
    this.isEditModalVisible = false;
  }
  editHandleOk() {
    if (this.editForm.invalid) return;

    const updated = {
      ...this.currentRow,
      ...this.editForm.value
    };
    const id = updated.id;
    // 👉 gọi API update
    this.authService.updateRole(id, updated).subscribe((res: any) => {
      if (res.message == "success") {
        this.PopupService.success("Update success");
        this.getAllRoles();
      } else {
        this.PopupService.error("Update failed");
      }

    });

    this.isEditModalVisible = false;
  }








  showCreateModal(): void {
    this.editingId = null;
    // this.validateForm.reset();
    this.isModalVisible = true;
  }


  handleOk(): void {
    // Create mode
    const formValue = this.createForm.value;
    const newRole: CreateRole = {
      code: formValue.code,
      name: formValue.name,
      description: formValue.description || ''
    };
    console.log(newRole);
    this.authService.createRole(newRole).subscribe((res: any) => {
      if (res.message == "success") {
        this.PopupService.success("Create success");
        this.getAllRoles();
      } else {
        this.PopupService.error("Create failed");
      }
    });
    this.isModalVisible = false;

  }

  handleCancel(): void {
    this.isModalVisible = false;
  }





  // delete role
  onDelete(row: any) {
    console.log('DELETE:', row);
    if (row.id) {
      console.log(row.id)
      // this.deviceService.deleteDevice(row.id).subscribe((res: any) => {
      //   if (res.message == "success") {
      //     this.gridApi.applyTransaction({
      //       remove: [row]
      //     });
      //     this.popup.success("Xóa thiết bị thành công");
      //   }
      //   else {
      //     this.popup.error(res.message);
      //   }
      // });
    }

  }

}
