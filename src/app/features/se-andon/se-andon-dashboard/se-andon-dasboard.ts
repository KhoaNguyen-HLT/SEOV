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
import { AndonService } from '../se-andon.service';
import dayjs from "dayjs";
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';



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




  data = [
    { hour: '01', value: 0 },
    { hour: '02', value: 0 },
    { hour: '03', value: 0 },
    { hour: '04', value: 1 },
    { hour: '05', value: 2 },
    { hour: '06', value: 5 },
    { hour: '07', value: 5 },
    { hour: '08', value: 5 },
    { hour: '09', value: 8 },
    { hour: '10', value: 12 },
    { hour: '11', value: 20 },
    { hour: '12', value: 18 },
    { hour: '13', value: 35 },
    { hour: '14', value: 40 },
    { hour: '15', value: 30 },
    { hour: '16', value: 35 },
    { hour: '17', value: 25 },
    { hour: '18', value: 10 },
    { hour: '19', value: 4 },
    { hour: '20', value: 5 },
    { hour: '21', value: 7 },
    { hour: '22', value: 5 },
    { hour: '23', value: 8 },
    { hour: '24', value: 1 }
  ];


  chartOption2 = {
    title: {
      text: 'Response Time by Hour',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: this.data.map(x => x.hour),
      name: 'Hour'
    },
    yAxis: {
      type: 'value',
      name: 'Minutes'
    },
    series: [
      {
        name: 'Avg Response Time',
        type: 'line',
        data: this.data.map(x => x.value),
        smooth: true,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#5470C6'
        },
        areaStyle: {
          opacity: 0.2
        }
      }
    ]
  };


  dataLineStop = {
    totalPlannedMinutes: 480,
    totalDowntimeMinutes: 30
  };


  chartOption3 = {
    title: {
      text: 'Line Stop Rate',
      subtext: '',
      left: 'center'
    },
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        progress: {
          show: true
        },
        detail: {
          formatter: '{value}%'
        },
        data: [
          {
            value: parseFloat(((this.dataLineStop.totalDowntimeMinutes / this.dataLineStop.totalPlannedMinutes) * 100).toFixed(2)),
            name: 'Line Stop Rate'
          }
        ],
        axisLine: {
          lineStyle: {
            width: 20
          }
        }
      }
    ]
  };




}
