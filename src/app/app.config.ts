import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { provideServiceWorker } from '@angular/service-worker';
registerLocaleData(vi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideNzI18n(vi_VN),
    provideEchartsCore({ echarts }),
    // ✅ đăng ký icon
    provideNzIcons(Object.values(AllIcons)),
    NzMessageService,
    importProvidersFrom(NzGridModule, NzModalModule), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
