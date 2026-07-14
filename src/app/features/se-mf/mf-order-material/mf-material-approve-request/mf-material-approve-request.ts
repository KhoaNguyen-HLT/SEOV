import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PopupService } from '../../../../shared/service/popup.service';
import { RejectReasonModalComponent } from '../../../../shared/components/reject/reject';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MfMaterialService } from '../mf-material.service';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-mf-material-approve-request',
  imports: [
    AgGridAngular,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzIconModule,
    CommonModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTagModule,
    NzDividerModule,
    NzTableModule

  ],
  templateUrl: './mf-material-approve-request.html',
  styleUrl: './mf-material-approve-request.css',
})
export class MfMaterialApproveRequestComponent {
  userName: String = ''
  searchForm!: FormGroup;
  rvForm!: FormGroup;
  detailform!: FormGroup;
  removeSub = false;
  removePacking = false;
  requestNo: string = '';
  hdData: any[] = [];
  rowData: any[] = [];
  zCode: { production_number: string; registered_at: any }[] = [];
  remark: string = '';
  columnDefs: ColDef[] = [
    {
      headerName: 'Mã NVL',
      field: 'materialCode',
      width: 150
    },
    {
      headerName: 'Tên NVL',
      field: 'itemName',
      flex: 1
    },
    {
      headerName: 'ĐVT',
      field: 'unit',
      width: 100
    },
    {
      headerName: 'SL Yêu Cầu',
      field: 'qtyOrder',
      width: 140,
      editable: true,
    },
    {
      headerName: 'SL Xuất',
      field: 'issuedQty',
      width: 140,
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellStyle: {
        backgroundColor: '#fffbe6'
      }
    },
    {
      headerName: 'Ghi Chú',
      field: 'remark',
      flex: 1,
      editable: true,
      cellStyle: {
        backgroundColor: '#fffbe6'
      }
    }
  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }

  gridApi: any;
  rowSelection: RowSelectionOptions = {
    mode: 'multiRow',
    checkboxes: true,
    headerCheckbox: true
  };



  constructor(private fb: FormBuilder, private PopupService: PopupService, 
    private ActivatedRoute: ActivatedRoute, 
    private AuthService: AuthService,
    private MfMaterialService: MfMaterialService, private modal: NzModalService) { }
  ngOnInit() {


    this.searchForm = this.fb.group({
      department: [null, Validators.required],
      date: [new Date()],
      remark: [null],
      zCode: [null, Validators.required],
    });
    this.userName = this.AuthService.userName;
    this.getDetailMaterialRequest();

  }

  getDetailMaterialRequest() {
    this.requestNo = this.ActivatedRoute.snapshot.queryParamMap.get('requestNo') || '';
    console.log(this.requestNo);
    this.MfMaterialService.getDetailMaterialRequest(this.requestNo).subscribe(res => {
      console.log(res)
      this.hdData = res.hdData;
      this.rowData = res.data;

    });

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }


  saveData() {
    const dataUpdate: any[] = [];

    this.gridApi.forEachNode((node: any) => {
      dataUpdate.push({
        id: node.data.id,
        issuedQty: node.data.issuedQty,
        remark: node.data.remark
      });
    });

    const payload = {
      requestNo: this.requestNo,
      approvedBy: this.userName,
      details: dataUpdate
    };

    this.MfMaterialService.updateIssuedMaterial(payload).subscribe(res => {
      console.log(res)
    });

    // this.MfMaterialService.updateIssuedMaterial(dataUpdate).subscribe(res => {
    //   this.PopupService.success('Cập nhật xuất kho thành công!');
    // });
  }


  approveRequest() {

    const payload = {
      requestNo: this.requestNo,
      approvedBy: this.userName
    };
// console.log(payload)
    this.MfMaterialService.approveRequest(payload).subscribe(res => {
      console.log(res)
      if (res.message === 'success') {
        this.PopupService.success('Duyệt thành công!');
        this.reload()
      } else {
        this.PopupService.error('Có lỗi xảy ra vui lòng thử lại!');
        this.reload()
      }
    });

  }


  rejectRequest() {

    const modal = this.modal.create({
      nzTitle: 'Hủy Request',
      nzContent: RejectReasonModalComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true
    });

    modal.afterClose.subscribe(result => {
      if (!result) return;

      const payload = {
        requestNo: this.requestNo,
        rejectedBy: this.userName,
        rejectReason: result.reason
      };

      this.MfMaterialService.rejectRequest(payload).subscribe(res => {
        console.log(res)
        if (res.message === 'success') {
          this.PopupService.success('Hủy thành công!');
          this.reload()
        } else {
          this.PopupService.error('Có lỗi xảy ra vui lòng thử lại!');
          this.reload()
        }
      });
    });

  }

  reload() {
    window.location.reload();
  }







}
