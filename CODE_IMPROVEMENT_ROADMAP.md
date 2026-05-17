# Lộ Trình Cải Tiến Code Project SEOV Frontend

> Mục tiêu: làm project rõ ràng hơn, dễ bảo trì hơn, giảm lỗi production và có kế hoạch cải tiến theo từng bước nhỏ.
>
> Trạng thái hiện tại: project build được, cấu trúc feature đã có nền tảng tốt, nhưng còn rủi ro về SSR/browser API, auth/session, typing, cleanup code, test và performance.

---

## 1. Nguyên Tắc Thực Hiện

- Làm theo từng phase nhỏ, không refactor ồ ạt.
- Mỗi lần sửa chỉ tập trung một mục tiêu rõ ràng.
- Ưu tiên sửa lỗi nền tảng trước khi làm đẹp UI hoặc tối ưu nâng cao.
- Mỗi phase phải có tiêu chí hoàn thành và cách kiểm tra.
- Luôn chạy `npm run build` sau các thay đổi quan trọng.

---

## 2. Thứ Tự Ưu Tiên Tổng Quan

| Ưu tiên | Nhóm việc | Lý do |
| --- | --- | --- |
| P0 | SSR-safe, auth, token, interval cleanup | Có thể gây lỗi runtime, rò rỉ timer hoặc rủi ro bảo mật |
| P1 | Chuẩn hóa service, type, route, environment | Giúp code dễ hiểu, dễ scale, dễ deploy |
| P2 | Test, performance, logging, UX consistency | Tăng độ ổn định lâu dài |
| P3 | Cleanup naming, comment, CSS, component polish | Làm codebase sạch và chuyên nghiệp hơn |

---

## 3. Phase 0 - Baseline & Quy Ước Làm Việc

**Mục tiêu:** có mốc hiện trạng rõ ràng trước khi sửa.

### Việc cần làm

- [ ] Tạo branch riêng cho đợt cải tiến, ví dụ `codex/code-improvement-foundation`.
- [ ] Ghi nhận baseline:
  - [ ] `npm run build` pass/fail.
  - [ ] Các warning build hiện có.
  - [ ] Số lượng file test hiện có.
  - [ ] Các module có rủi ro cao: `auth`, `se-andon`, `device`, `user`.
- [ ] Chốt convention:
  - [ ] File/folder: `kebab-case`.
  - [ ] Class/component/interface: `PascalCase`.
  - [ ] Biến/hàm: `camelCase`.
  - [ ] Không thêm `any` mới ở service/domain chính.
  - [ ] Không log token, password, payload nhạy cảm.

### Done khi

- [ ] Có checklist baseline.
- [ ] Build hiện tại đã được ghi nhận.
- [ ] Có quy ước rõ trước khi bắt đầu sửa.

### Kiểm tra

```bash
npm run build
npm test -- --watch=false
```

Ghi chú: hiện tại `npm test -- --watch=false` fail vì chưa có file test.

---

## 4. Phase 1 - Sửa Rủi Ro SSR Và Browser API

**Mục tiêu:** không để code dùng `window`, `document`, `localStorage` ở nơi có thể chạy trên server.

### Vấn đề hiện tại

- `src/app/environments/environments.ts` dùng `window.location.hostname` trực tiếp.
- `src/app/features/se-andon/se-andon-call/se-andon-call.ts` đọc `localStorage` ở top-level.
- Một số service/component đọc `localStorage` trực tiếp thay vì qua abstraction.

### Việc cần làm

- [ ] Quyết định project có thật sự cần SSR không.
- [ ] Nếu cần SSR:
  - [ ] Không dùng `window` trong `environment`.
  - [ ] Tạo `BrowserStorageService` để đọc/ghi token an toàn.
  - [ ] Dùng `isPlatformBrowser` trước mọi thao tác browser-only.
- [ ] Nếu không cần SSR:
  - [ ] Gỡ hoặc vô hiệu hóa cấu hình SSR để giảm độ phức tạp.
  - [ ] Vẫn giữ code browser API sạch, không dùng ở top-level.
- [ ] Chuyển `localStorage.getItem('token')` trong `se-andon-call.ts` vào `ngOnInit`.
- [ ] Kiểm tra lại các chỗ dùng:
  - [ ] `window`
  - [ ] `document`
  - [ ] `localStorage`
  - [ ] `setInterval`

### Done khi

- [ ] Không còn browser API ở top-level module.
- [ ] App build được.
- [ ] Route login/welcome/andon không lỗi khi refresh trang.

### Kiểm tra

```bash
rg -n "window\\.|document\\.|localStorage|setInterval" src/app
npm run build
```

---

## 5. Phase 2 - Chuẩn Hóa Auth, Token Và Session

**Mục tiêu:** auth có một nguồn quản lý rõ ràng, giảm logic rải rác.

### Vấn đề hiện tại

- Token đang được đọc trực tiếp ở nhiều nơi.
- `AuthGuard` log token ra console.
- `AuthService.checkToken()` tự đọc localStorage.
- Chưa có interceptor chuẩn để gắn token vào request và xử lý 401/403.

### Việc cần làm

- [ ] Tạo `TokenStorageService` hoặc `SessionService`.
- [ ] Chỉ service này được phép đọc/ghi/xóa token.
- [ ] Sửa `AuthService`:
  - [ ] `login()` trả type cụ thể.
  - [ ] `checkToken()` không tự đọc localStorage nếu có thể truyền token hoặc dùng session service.
  - [ ] `logout()` xóa token và reset state.
- [ ] Sửa `AuthGuard`:
  - [ ] Bỏ `console.log` token.
  - [ ] Chuyển logic redirect về helper rõ ràng.
  - [ ] Xử lý SSR/browser rõ.
- [ ] Thêm HTTP interceptor:
  - [ ] Gắn `Authorization` header nếu có token.
  - [ ] Gặp 401/403 thì logout hoặc redirect login.
- [ ] Chuẩn hóa message login fail/session expired.

### Done khi

- [ ] Không còn đọc token trực tiếp rải rác trong component.
- [ ] Không còn log token.
- [ ] Login/logout/check token có flow rõ.
- [ ] Manual test pass cho login success, login fail, expired token, logout.

### Kiểm tra

```bash
rg -n "localStorage|getItem\\('token'\\)|setItem\\('token'\\)|console\\.log.*token" src/app
npm run build
```

---

## 6. Phase 3 - Dọn Timer, Subscription Và Side Effects

**Mục tiêu:** tránh memory leak và làm component dễ đọc hơn.

### Vấn đề hiện tại

- `se-andon-call.ts` dùng `setInterval` nhưng chưa cleanup.
- Nhiều `subscribe()` nằm trực tiếp trong component.
- Component vừa xử lý form, API, timer, mapping data, popup, route.

### Việc cần làm

- [ ] Thêm `OnDestroy` cho component có timer/subscription dài hạn.
- [ ] Clear interval trong `ngOnDestroy`.
- [ ] Với stream dài hạn, dùng `takeUntilDestroyed()` hoặc `DestroyRef`.
- [ ] Tách logic timer trong Andon thành helper/service nhỏ nếu tiếp tục phình to.
- [ ] Chuẩn hóa loading/error/success cho các API call.
- [ ] Không mutate object trong list nếu có thể map ra object mới.

### Done khi

- [ ] Không còn interval chạy chồng khi rời màn hình.
- [ ] Component Andon dễ đọc hơn, các block logic được tách rõ.
- [ ] Không có subscription dài hạn không cleanup.

### Kiểm tra

```bash
rg -n "setInterval|subscribe\\(" src/app/features
npm run build
```

---

## 7. Phase 4 - Chuẩn Hóa Type Và API Contract

**Mục tiêu:** giảm `any`, tăng type-safety cho các luồng chính.

### Vấn đề hiện tại

- Nhiều service trả `Observable<any>`.
- Request/response API chưa có interface rõ.
- Component phải đoán shape của `res.data`, `res.message`.

### Việc cần làm

- [ ] Tạo thư mục model theo domain, ví dụ:
  - [ ] `src/app/features/auth/models`
  - [ ] `src/app/features/user/models`
  - [ ] `src/app/features/se-andon/models`
  - [ ] `src/app/features/common/device/models`
- [ ] Tạo response envelope dùng chung:

```ts
export interface ApiResponse<T> {
  message: string;
  data: T;
}
```

- [ ] Tạo type cho login:
  - [ ] `LoginRequest`
  - [ ] `LoginResponse`
  - [ ] `DecodedToken`
- [ ] Tạo type cho device:
  - [ ] `Device`
  - [ ] `DeviceSearchRequest`
  - [ ] `DeviceUpdateRequest`
- [ ] Tạo type cho Andon:
  - [ ] `AndonRequest`
  - [ ] `AndonStatus`
  - [ ] `AndonLog`
  - [ ] `ChangeGroupRequest`
- [ ] Thay dần `Observable<any>` trong service core.

### Done khi

- [ ] `AuthService`, `DeviceService`, `AndonService` không còn `Observable<any>` ở endpoint chính.
- [ ] Component không cần cast `res as any` cho luồng chính.
- [ ] Build pass.

### Kiểm tra

```bash
rg -n "Observable<any>|: any|any\\[\\]" src/app/features src/app/shared
npm run build
```

---

## 8. Phase 5 - Chuẩn Hóa Route Và Layout

**Mục tiêu:** URL rõ ràng, không bị trùng nghĩa.

### Vấn đề hiện tại

- Có route `/andon/andon`.
- Module `andon` xuất hiện cả dưới layout riêng và dưới `/welcome`.
- Một số tên file có typo như `se-andon-dasboard`.

### Việc cần làm

- [ ] Quyết định route chính cho Andon:
  - [ ] Cách A: Andon là app riêng: `/andon`.
  - [ ] Cách B: Andon nằm trong main app: `/welcome/andon`.
- [ ] Xóa route trùng hoặc redirect rõ ràng.
- [ ] Chuẩn hóa route default cho từng module.
- [ ] Sửa typo file/folder nếu có thể làm an toàn:
  - [ ] `se-andon-dasboard` -> `se-andon-dashboard`
  - [ ] `permission-management1` -> tên rõ nghĩa hơn
- [ ] Kiểm tra menu/sidebar trỏ đúng URL.

### Done khi

- [ ] URL đọc vào hiểu ngay màn hình nào.
- [ ] Không có route lặp không cần thiết.
- [ ] Refresh URL trực tiếp vẫn vào đúng trang.

### Kiểm tra

```bash
rg -n "path: 'andon'|dasboard|permission-management1" src/app
npm run build
```

---

## 9. Phase 6 - Dọn Debug Log, Encoding Và Naming

**Mục tiêu:** code sạch hơn, đọc tiếng Việt đúng, giảm nhiễu khi debug.

### Vấn đề hiện tại

- Nhiều comment/message tiếng Việt bị lỗi encoding.
- Nhiều `console.log` trong luồng nghiệp vụ.
- Có import thừa và code thử nghiệm còn sót.

### Việc cần làm

- [ ] Sửa file encoding về UTF-8.
- [ ] Sửa message/comment bị lỗi font.
- [ ] Bỏ console log không cần thiết.
- [ ] Với log cần giữ, tạo `LoggerService` có thể tắt ở production.
- [ ] Xóa import thừa:
  - [ ] `bootstrapApplication`, `enableProdMode`, `provideZoneChangeDetection` nếu không dùng.
  - [ ] icon/provider không dùng.
- [ ] Đổi tên biến/service cho thống nhất:
  - [ ] `PopupService` property nên là `popupService` hoặc `popup`.
  - [ ] Method nên dùng camelCase, ví dụ `getAllPermissions` thay vì `GetAllPermissions`.

### Done khi

- [ ] Không còn message lỗi encoding ở màn hình chính.
- [ ] Không còn debug log lộ dữ liệu.
- [ ] Import sạch hơn.

### Kiểm tra

```bash
rg -n "console\\.log|console\\.error|khoacheck|FIX|TODO|â|ð" src/app
npm run build
```

---

## 10. Phase 7 - Thêm Test Tối Thiểu

**Mục tiêu:** có lưới an toàn trước khi refactor sâu hơn.

### Vấn đề hiện tại

- Chưa có file `.spec.ts`.
- `npm test -- --watch=false` fail vì không tìm thấy test.

### Việc cần làm

- [ ] Tạo test cho `AuthGuard`.
- [ ] Tạo test cho `AuthService`:
  - [ ] login gọi đúng endpoint.
  - [ ] check token xử lý đúng response.
- [ ] Tạo test cho `LoginComponent`:
  - [ ] form invalid thì không gọi API.
  - [ ] login success thì lưu token và navigate.
  - [ ] login fail thì hiện error.
- [ ] Tạo test cho helper timer Andon nếu đã tách helper.
- [ ] Đảm bảo test command chạy được trong CI/local.

### Done khi

- [ ] `npm test -- --watch=false` pass.
- [ ] Có ít nhất test cho auth flow.
- [ ] Khi sửa auth, test bắt được lỗi cơ bản.

### Kiểm tra

```bash
npm test -- --watch=false
npm run build
```

---

## 11. Phase 8 - Performance Và Bundle Size

**Mục tiêu:** giảm warning build và tối ưu tải trang.

### Vấn đề hiện tại

- Initial bundle khoảng 2.80 MB, vượt budget 2 MB.
- `se-andon-call.css` vượt component style budget.
- `dayjs` gây CommonJS optimization bailout.

### Việc cần làm

- [ ] Kiểm tra dependency lớn:
  - [ ] `echarts`
  - [ ] `ag-grid`
  - [ ] `ng-zorro-antd`
  - [ ] FontAwesome nếu không dùng nhiều
- [ ] Đảm bảo các màn hình nặng được lazy load.
- [ ] Import icon/component theo nhu cầu, tránh import rộng.
- [ ] Kiểm tra cách import `dayjs`.
- [ ] Tách bớt CSS lớn của `se-andon-call`:
  - [ ] Xóa rule không dùng.
  - [ ] Dùng class ngắn, tránh style global trong component.
  - [ ] Chuyển style dùng chung ra shared/global nếu hợp lý.
- [ ] Cân nhắc tăng budget chỉ sau khi đã tối ưu có lý do.

### Done khi

- [ ] Warning bundle giảm hoặc có lý do chấp nhận rõ.
- [ ] Component CSS không vượt budget hoặc budget được điều chỉnh có chủ đích.
- [ ] Không có dependency lớn bị import vào initial bundle nếu không cần.

### Kiểm tra

```bash
npm run build
```

---

## 12. Phase 9 - Chuẩn Hóa UX Và Component Dùng Chung

**Mục tiêu:** trải nghiệm nhất quán giữa các module.

### Việc cần làm

- [ ] Chuẩn hóa button/action cell trong ag-grid.
- [ ] Không trả HTML string cho action button nếu có thể dùng Angular component.
- [ ] Chuẩn hóa popup message:
  - [ ] success
  - [ ] error
  - [ ] confirm delete
  - [ ] loading
- [ ] Chuẩn hóa form validation message.
- [ ] Chuẩn hóa table empty/loading/error state.
- [ ] Kiểm tra responsive cho các màn hình chính:
  - [ ] login
  - [ ] dashboard
  - [ ] device list
  - [ ] andon call
  - [ ] role/permission management

### Done khi

- [ ] Người dùng thấy message/form/button nhất quán.
- [ ] Các màn hình chính không vỡ layout ở desktop và mobile/tablet nếu cần.
- [ ] Delete/update/create đều có phản hồi rõ ràng.

---

## 13. Checklist Trước Mỗi PR

- [ ] PR chỉ giải quyết một mục tiêu.
- [ ] Không sửa lan sang module không liên quan.
- [ ] Không thêm `any` mới ở service/domain chính.
- [ ] Không thêm browser API ở top-level.
- [ ] Không log dữ liệu nhạy cảm.
- [ ] Build pass.
- [ ] Test pass nếu đã có test.
- [ ] Manual test luồng bị ảnh hưởng.
- [ ] Message tiếng Việt hiển thị đúng.

---

## 14. Kế Hoạch 2 Tuần Gợi Ý

### Tuần 1

| Ngày | Việc chính |
| --- | --- |
| Ngày 1 | Baseline, branch, checklist, thống nhất SSR có dùng hay không |
| Ngày 2 | Sửa `environment`, `localStorage` top-level, browser API |
| Ngày 3 | Chuẩn hóa token/session service |
| Ngày 4 | Sửa `AuthGuard`, `AuthService`, login flow |
| Ngày 5 | Cleanup log nhạy cảm, chạy build, manual test auth |

### Tuần 2

| Ngày | Việc chính |
| --- | --- |
| Ngày 1 | Cleanup timer/subscription trong Andon |
| Ngày 2 | Tạo model/type cho auth và device |
| Ngày 3 | Tạo model/type cho Andon |
| Ngày 4 | Chuẩn hóa route `/andon` và `/welcome/andon` |
| Ngày 5 | Thêm test tối thiểu cho auth, chạy build/test |

---

## 15. Milestone Theo Dõi

- [ ] M1: SSR/browser API an toàn.
- [ ] M2: Auth/token/session rõ ràng, không log token.
- [ ] M3: Andon không leak timer/subscription.
- [ ] M4: Core service có type rõ.
- [ ] M5: Route/layout rõ ràng.
- [ ] M6: Test auth tối thiểu pass.
- [ ] M7: Build không còn warning nghiêm trọng hoặc đã có lý do chấp nhận.

---

## 16. Definition Of Done Cho Đợt Cải Tiến

Một hạng mục được xem là xong khi:

- [ ] Code build pass.
- [ ] Không tạo regression ở luồng chính.
- [ ] Không thêm `any` hoặc hardcode mới không cần thiết.
- [ ] Không có log nhạy cảm.
- [ ] Có test hoặc manual test rõ ràng.
- [ ] Naming và message dễ hiểu.
- [ ] Nếu còn warning, có ghi chú lý do và kế hoạch xử lý.

---

## 17. Gợi Ý Thứ Tự Bắt Đầu Ngay

1. Sửa SSR/browser API.
2. Chuẩn hóa auth/token.
3. Cleanup timer trong Andon.
4. Tạo type cho API chính.
5. Dọn route.
6. Thêm test auth.
7. Tối ưu bundle/CSS.

Nếu chỉ có ít thời gian, hãy làm theo đúng thứ tự trên. Đây là đường đi ngắn nhất để project ổn hơn mà không làm xáo trộn quá nhiều.
