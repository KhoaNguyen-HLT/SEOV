# SOLO STANDARDIZATION TASKLIST

> Dành cho 1 dev triển khai dần để dự án chuẩn hơn, an toàn hơn, dễ maintain hơn.
> Cách làm: đi theo thứ tự, mỗi task nhỏ có thể hoàn thành trong 0.5–1 ngày.

---

## Giai đoạn 0 — Chuẩn bị (0.5 ngày)

- [ ] Tạo branch chuẩn hóa riêng (ví dụ: `chore/standardize-foundation`).
- [ ] Chốt nguyên tắc: mỗi PR chỉ 1 mục tiêu (naming hoặc typing hoặc auth flow).
- [ ] Snapshot hiện trạng: ghi lại các vấn đề chính đang có (ngắn gọn 1 file note).

**Done khi:** có branch riêng + có baseline để so sánh trước/sau.

---

## Giai đoạn 1 — Dọn nền tảng coding standards (1 ngày)

- [ ] Viết checklist code cá nhân (naming, structure, typing, error handling).
- [ ] Chuẩn hóa quy ước đặt tên:
  - file/folder: `kebab-case`
  - class/interface: `PascalCase`
  - biến/hàm: `camelCase`
- [ ] Lập danh sách file đang lệch chuẩn để xử lý dần (không đổi ồ ạt một lần).

**Done khi:** bạn có checklist cố định để tự review trước mỗi commit.

---

## Giai đoạn 2 — Chuẩn hóa Auth (ưu tiên cao nhất) (2–3 ngày)

- [ ] Vẽ lại auth flow hiện tại (login/check token/guard/logout).
- [ ] Quy định 1 nơi duy nhất xử lý token/session.
- [ ] Chuẩn hóa guard behavior (browser + SSR-safe).
- [ ] Chuẩn hóa interceptor cho auth header + unauthorized handling.
- [ ] Chuẩn hóa thông báo lỗi auth (tránh message trùng/lệch).

**Done khi:** auth flow có logic rõ ràng, không phân tán token khắp nơi.

---

## Giai đoạn 3 — Typed API Contracts (2–3 ngày)

- [ ] Tạo model/DTO cho các module core: `auth`, `user`, `role`, `permission`.
- [ ] Thay dần `Observable<any>` bằng kiểu cụ thể ở core service.
- [ ] Tạo chuẩn response/error object dùng chung.
- [ ] Đảm bảo form/value mapping không còn điểm mù kiểu dữ liệu.

**Done khi:** các API core có typing đủ dùng, giảm mạnh `any`.

---

## Giai đoạn 4 — Tách bớt side-effects trong component (2 ngày)

- [ ] Chọn 1 module mẫu (khuyên bắt đầu từ `login`) để làm chuẩn.
- [ ] Tách business flow khỏi component (component giữ UI + state nhẹ).
- [ ] Đồng nhất pattern loading/success/error.
- [ ] Dọn `console.log/error` trực tiếp trong luồng nghiệp vụ.

**Done khi:** component mỏng hơn, dễ đọc, dễ test, dễ sửa.

---

## Giai đoạn 5 — Environment & deploy safety (1–2 ngày)

- [ ] Tách cấu hình môi trường rõ: local / staging / production.
- [ ] Bỏ hardcode endpoint trong runtime logic.
- [ ] Tạo checklist trước deploy (build, smoke test, auth check, route check).

**Done khi:** đổi môi trường không cần sửa code nghiệp vụ.

---

## Giai đoạn 6 — Quality gate tối thiểu cho 1 người (1–2 ngày)

- [ ] Chạy lint trước mỗi commit.
- [ ] Viết test tối thiểu cho các điểm rủi ro cao:
  - auth guard
  - login success/fail
  - service contract chính
- [ ] Tạo routine cá nhân trước merge:
  - lint pass
  - build pass
  - test pass (nhóm trọng yếu)

**Done khi:** bạn có “hàng rào” chống regression cơ bản.

---

## Checklist lặp lại cho MỖI PR

- [ ] PR chỉ xử lý 1 mục tiêu kỹ thuật.
- [ ] Không mở rộng scope ngoài kế hoạch.
- [ ] Không thêm `any` mới ở module core.
- [ ] Không hardcode config/env.
- [ ] Lint/build pass.
- [ ] Tự review lại theo checklist standards.

---

## Thứ tự thực thi khuyến nghị (solo-friendly)

1. Auth flow
2. Typing contracts
3. Component cleanup
4. Env/deploy
5. Tests & quality gate

---

## Kế hoạch 2 tuần thực tế (nếu bạn bận)

### Tuần 1
- [ ] Ngày 1: Giai đoạn 0 + 1
- [ ] Ngày 2-3: Giai đoạn 2 (auth)
- [ ] Ngày 4-5: Bắt đầu Giai đoạn 3 (typing core)

### Tuần 2
- [ ] Ngày 1-2: Hoàn tất Giai đoạn 3
- [ ] Ngày 3-4: Giai đoạn 4 (component cleanup module mẫu)
- [ ] Ngày 5: Giai đoạn 5 + checklist release tối thiểu

---

## Mốc hoàn thành (milestone)

- [ ] M1: Auth chuẩn hóa xong
- [ ] M2: Core services typed ổn định
- [ ] M3: 1 module mẫu clean architecture
- [ ] M4: Deploy đa môi trường ổn
- [ ] M5: Có quality gate cá nhân

---

## Ghi chú quan trọng

- Làm một mình thì ưu tiên **ổn định và đều đặn**, không refactor ồ ạt.
- Mỗi ngày chỉ cần hoàn tất 1-2 task nhỏ là dự án sẽ tiến bộ rõ sau 2-4 tuần.
