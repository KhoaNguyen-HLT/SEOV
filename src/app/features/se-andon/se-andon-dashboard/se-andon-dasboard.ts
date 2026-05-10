import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ModuleRegistry } from "ag-grid-community";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { AllCommunityModule } from "ag-grid-community";
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { NZ_DATE_LOCALE } from "ng-zorro-antd/i18n";
import { Router } from "@angular/router";
import { NzIconModule, provideNzIcons } from 'ng-zorro-antd/icon';
import { HomeOutline } from '@ant-design/icons-angular/icons';
import { AndonService } from '../se-andon.service';
import dayjs from "dayjs";
import { NgxEchartsModule } from 'ngx-echarts';



registerLocaleData(localeVi);

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-se-andon-dasboard',
  imports: [
    CommonModule,
    NzButtonModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule,
    NgxEchartsModule
  ],
  providers: [
    { provide: NZ_DATE_LOCALE, useValue: localeVi },
  ],
  templateUrl: './se-andon-dasboard.html',
  styleUrl: './se-andon-dasboard.css',
})
export class seAndonDashboardComponent {
  searchForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private AndonService: AndonService) { }

  ngOnInit(): void {
    const today = new Date();

    // Ngày đầu tháng
    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // Ngày cuối tháng
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    this.searchForm = this.fb.group({
      line: [null],
      status: [null],
      fromDate: [firstDay],
      toDate: [lastDay],
    })

    this.getDashboardData();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }
  getDashboardData() {
    const raw = this.searchForm.value;
    const payload = {
      ...raw,
      line: raw.line ? raw.line : '',
      fromDate: raw.fromDate
        ? dayjs(raw.fromDate).format('YYYY-MM-DD HH:mm:ss')
        : null,
      toDate: raw.toDate
        ? dayjs(raw.toDate).format('YYYY-MM-DD HH:mm:ss')
        : null
    };
    // console.log(payload);
    // return

    this.AndonService.andonDashboardData(payload).subscribe((res) => {
      console.log(res.data);
    });
  }


  goToHomePage() {
    this.router.navigate(['/welcome/dashboard']);
  }

  chartOption: any = {
    title: {
      text: 'Error Of Month',
      subtext: '',
      left: 'center'
    },

    tooltip: {
      trigger: 'item'
    },

    legend: {
      orient: 'horizontal',
      left: 'left'
    },

    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',

        data: [
          { value: 1048, name: 'PE' },
          { value: 735, name: 'ME' },
          { value: 580, name: 'IT' },
          { value: 484, name: 'Chất Lượng' },
          { value: 300, name: 'An Toàn' }
        ],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  chartOption3: any = {
    title: {
      text: 'Error Of Month',
      subtext: '',
      left: 'center'
    },

    tooltip: {
      trigger: 'item'
    },

    legend: {
      orient: 'horizontal',
      left: 'left'
    },

    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',

        data: [
          { value: 1048, name: 'PE' },
          { value: 735, name: 'ME' },
          { value: 580, name: 'IT' },
          { value: 484, name: 'Chất Lượng' },
          { value: 300, name: 'An Toàn' }
        ],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };



  chartOption1: any = {
    title: {
      text: 'Total Error in Week',
      subtext: '',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };







}
