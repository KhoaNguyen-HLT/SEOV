import { AndonService } from '../se-andon.service';
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
  imports: [],
  templateUrl: './se-andon-report.html',
  styleUrl: './se-andon-report.css',
})
export class seAndonReportComponent {
  rowData: any[] = [];

  // defaultColDef = {
  //   sortable: true,
  //   filter: true,
  //   resizable: true
  // };


  gridApi: any;

  constructor(private andonService: AndonService) { }
}
