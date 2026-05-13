# PROJECT ASSESSMENT & REFACTOR ROADMAP

## 1) Executive summary

Dự án có nền tảng tốt để phát triển dài hạn: Angular hiện đại, strict TypeScript bật sẵn, tổ chức theo feature, có auth guard và SSR setup.

Tuy nhiên, hiện có một số vấn đề quan trọng về tính nhất quán kiến trúc, auth/token handling, typing contract, và môi trường triển khai. Nếu không xử lý sớm, các vấn đề này sẽ tăng chi phí bảo trì theo thời gian.

**Đánh giá tổng quan hiện tại**
- Kiến trúc tổng thể: **7/10**
- Chất lượng code hiện tại: **6.5/10**
- Khả năng mở rộng team/dev: **6/10**
- Production readiness: **6/10**

**Mục tiêu sau cải thiện (8–12 tuần):**
- Nâng lên mức **8+/10** về maintainability và production readiness.

---

## 2) Điểm mạnh hiện tại

1. **Modern Angular stack**
   - Dùng Angular mới, standalone component, lazy route.
2. **Strict mode đã bật**
   - `strict`, `strictTemplates` giúp hạn chế lỗi runtime.
3. **Tổ chức feature tương đối rõ**
   - Có phân tách `features`, `shared`, `layout`.
4. **Có auth flow nền tảng**
   - Có login, guard, check token.
5. **Có cấu hình SSR/build budget**
   - Là tín hiệu tốt cho tư duy production.

---

## 3) Vấn đề chính cần ưu tiên

## 3.1 Kiến trúc & consistency
- Naming chưa nhất quán (có dấu hiệu trùng/typo/suffix bất thường như `...1`, `dasboard`).
- Cấu trúc file một số chỗ bị lệch chuẩn naming/import.
- Side-effect phân tán trong component (storage, routing, popup, timeout, api call trộn nhau).

**Ảnh hưởng:** khó onboarding, khó review, tăng bug do import/đặt tên nhầm.

## 3.2 Auth & security flow
- Token đang dùng trực tiếp qua `localStorage` nhiều điểm.
- Check token và điều hướng nằm rải rác, chưa có source-of-truth rõ.
- Chưa thấy chuẩn hóa interceptor cho auth header/error handling.

**Ảnh hưởng:** rủi ro bảo mật và khó kiểm soát vòng đời phiên đăng nhập.

## 3.3 Typing & API contract
- Nhiều hàm trả `Observable<any>`.
- Chưa chuẩn hóa DTO/request-response model theo domain.

**Ảnh hưởng:** strict mode bị giảm hiệu quả, bug runtime tăng khi scale.

## 3.4 Environment & deployment
- URL/API có dấu hiệu hardcode và phụ thuộc môi trường chạy trực tiếp.
- Chưa tách chiến lược env theo dev/staging/prod một cách chuẩn hóa pipeline.

**Ảnh hưởng:** dễ lỗi khi triển khai nhiều môi trường.

## 3.5 Logging/monitoring/testing
- Có log trực tiếp bằng console trong luồng nghiệp vụ.
- Test coverage cho auth flow/chức năng trọng yếu chưa thấy rõ.

**Ảnh hưởng:** khó debug production, khó rollback an toàn.

---

## 4) Roadmap cải thiện theo giai đoạn

## Phase 0 (Tuần 1) — Chuẩn hóa nền tảng làm việc

### Mục tiêu
- Chốt tiêu chuẩn code để toàn team làm đồng nhất.

### Việc cần làm
1. Ban hành chuẩn naming file/folder/class/service/component.
2. Chốt guideline kiến trúc component vs service (phân tách responsibility).
3. Chốt quy ước typed API (không dùng `any` cho luồng chính).
4. Định nghĩa checklist PR review thống nhất.

### Deliverables
- `CONTRIBUTING` nội bộ hoặc tài liệu team coding standards.
- PR template có checklist quality.

---

## Phase 1 (Tuần 2–3) — Ổn định Auth & Session

### Mục tiêu
- Chuẩn hóa vòng đời đăng nhập, token, điều hướng.

### Việc cần làm
1. Thiết kế auth state chuẩn (login/logout/expired/refresh nếu có).
2. Quy định 1 nơi xử lý token (abstraction layer).
3. Chuẩn hóa interceptor cho Authorization header & auth error.
4. Thống nhất guard behavior cho browser/SSR.

### Deliverables
- Tài liệu luồng auth (sequence ngắn + rule).
- Danh sách tác vụ migration auth theo module.

---

## Phase 2 (Tuần 4–5) — Typed contracts & service layer

### Mục tiêu
- Nâng type-safety cho các API chính.

### Việc cần làm
1. Tạo DTO/interface cho auth/user/role/permission.
2. Loại bỏ dần `Observable<any>` ở core service.
3. Chuẩn hóa error model (status/code/message) dùng chung.

### Deliverables
- Bộ model/domain types cho module chính.
- Checklist “no-any in core domain services”.

---

## Phase 3 (Tuần 6–7) — Clean architecture trong UI

### Mục tiêu
- Giảm side-effect trong component, tăng khả năng test.

### Việc cần làm
1. Tách luồng nghiệp vụ khỏi component (facade/use-case style nếu phù hợp).
2. Chuẩn hóa pattern xử lý loading/success/error.
3. Đồng nhất message và UX trong popup/toast.

### Deliverables
- Pattern reference cho 1–2 module điển hình.
- Tài liệu “component responsibilities”.

---

## Phase 4 (Tuần 8–9) — Environment & release readiness

### Mục tiêu
- Sẵn sàng triển khai nhiều môi trường ổn định.

### Việc cần làm
1. Tách env dev/staging/prod theo pipeline.
2. Bỏ hardcode endpoint trong code runtime.
3. Chuẩn hóa build + release checklist.

### Deliverables
- Tài liệu cấu hình môi trường.
- Release checklist trước deploy.

---

## Phase 5 (Tuần 10–12) — Quality gates

### Mục tiêu
- Duy trì chất lượng ổn định theo thời gian.

### Việc cần làm
1. Thiết lập lint rules chặt hơn cho naming/import/style.
2. Bổ sung test trọng yếu: auth guard, login flow, service contract.
3. Bổ sung logging strategy theo môi trường.

### Deliverables
- Quality gate trong CI.
- Dashboard đơn giản theo dõi lỗi/lint/test.

---

## 5) Backlog ưu tiên (P0/P1/P2)

## P0 — Cần làm ngay
- Chuẩn hóa naming & cấu trúc file/module.
- Chuẩn hóa auth flow + token lifecycle.
- Typed contract cho API auth/user.

## P1 — Làm tiếp theo
- Chuẩn hóa environment config cho multi-env.
- Chuẩn hóa error handling và logging strategy.
- Giảm side-effect trong component.

## P2 — Nâng cao
- Tăng test coverage theo risk-based approach.
- Tối ưu bundle/performance theo số liệu thực tế.
- Cải thiện observability (theo dõi lỗi theo module).

---

## 6) Definition of Done (DoD) cho đợt refactor

Một hạng mục refactor được coi là hoàn tất khi:
1. Không phá behavior cũ (manual test pass theo checklist).
2. Không thêm `any` mới vào core domain.
3. Có typed request/response cho endpoint liên quan.
4. Có xử lý error thống nhất (không nuốt lỗi im lặng).
5. Naming/import đúng convention team.
6. Lint pass cho phạm vi thay đổi.

---

## 7) KPI theo dõi tiến độ cải thiện

- Tỷ lệ service core không còn `any`.
- Số lượng vi phạm naming/style theo lint.
- Tỷ lệ module auth/user có typed contract đầy đủ.
- Tỷ lệ test pass cho flow quan trọng.
- Số lỗi production liên quan auth/session theo sprint.

---

## 8) Khuyến nghị triển khai thực tế

1. **Không refactor ồ ạt**: đi theo module, mỗi sprint 1 phạm vi nhỏ.
2. **Ưu tiên đường đăng nhập và quyền** trước các module khác.
3. **Mỗi PR phải có mục tiêu duy nhất** (naming hoặc typing hoặc auth flow).
4. **Đo lường trước/sau** để chứng minh hiệu quả refactor.

---

## 9) Kết luận

Dự án đang ở mức “nền tảng tốt nhưng cần chuẩn hóa để scale”.
Nếu bám theo roadmap trên, team có thể cải thiện rõ rệt trong 2–3 tháng mà vẫn giảm rủi ro gián đoạn vận hành.
