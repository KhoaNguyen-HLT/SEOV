import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

registerLocaleData(vi);

import {
  DashboardOutline,
  SettingOutline,
  UserOutline,
  TeamOutline,
  CaretRightOutline,
  PlusOutline,
  FormOutline,
  HistoryOutline,
} from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideNzI18n(vi_VN),

    // ✅ đăng ký icon
    provideNzIcons([
      DashboardOutline,
      SettingOutline,
      UserOutline,
      TeamOutline,
      PlusOutline,
      CaretRightOutline,
      FormOutline,
      HistoryOutline,
    ]),

    NzMessageService,

    // ✅ ĐÚNG: import module vào đây
    importProvidersFrom(NzGridModule, NzModalModule),
  ],
};
