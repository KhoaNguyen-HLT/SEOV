import { UserService } from '../se-andon.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { Component, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule]);
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './se-andon-report.html',
  styleUrl: './se-andon-report.css',
})
export class seAndonReportComponent {
  rowData: any[] = [];
  columnDefs = [
    { field: 'username', filter: true, sortable: true },
    { field: 'name' },
    { field: 'email' },
    { field: 'position' },
    { field: 'section' },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: (params: any) => {
        return `
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      `;
      },
    },
  ];

  // defaultColDef = {
  //   sortable: true,
  //   filter: true,
  //   resizable: true
  // };

  // 👉 Export Excel
  exportExcel() {
    this.gridApi.exportDataAsExcel({
      fileName: 'danh-sach.xlsx',
      sheetName: 'Users'
    });
  }

  gridApi: any;

  constructor(private userService: UserService) { }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.userService.getUsers().subscribe((res) => {
      this.gridApi.setGridOption('rowData', res);
    });

    // bắt click trong grid
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('btn-edit')) {
        this.onEdit(event.data);
      }

      if (event.event.target.classList.contains('btn-delete')) {
        this.onDelete(event.data);
      }
    });
  }
  onEdit(row: any) {
    console.log('EDIT:', row);
    // ví dụ: mở form / modal
    // this.selectedUser = row;
  }
  onDelete(row: any) {
    console.log('DELETE:', row);

    // ví dụ: mở form / modal
    // this.selectedUser = row;
  }
}
