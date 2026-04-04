import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DashboardOutline, SettingOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { TeamOutline } from '@ant-design/icons-angular/icons';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(vi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNzI18n(vi_VN),
    NzGridModule,
    // 👇 ĐĂNG KÝ ICON Ở ĐÂY
    provideNzIcons([DashboardOutline, SettingOutline, UserOutline, TeamOutline]),
  ],
};
