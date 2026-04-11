import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
registerLocaleData(vi);

import { 
  DashboardOutline, 
  SettingOutline, 
  UserOutline,
  TeamOutline,
  CaretRightOutline,
  PlusOutline,
  FormOutline,
  HistoryOutline   
} from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // provideClientHydration(withEventReplay()),
    provideNzI18n(vi_VN),
    NzGridModule,
    // 👇 ĐĂNG KÝ ICON Ở ĐÂY
    provideNzIcons([DashboardOutline, SettingOutline, UserOutline, TeamOutline, PlusOutline, CaretRightOutline, FormOutline, HistoryOutline]),
  ],
};
