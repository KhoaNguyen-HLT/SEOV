# STANDARDIZATION SPRINT PLAN (2-WEEK SPRINTS)

## Mục tiêu tổng
Chuẩn hóa dự án theo hướng dễ maintain, dễ scale, giảm rủi ro production, **không làm gián đoạn nghiệp vụ**.

---

## Sprint 1 (Tuần 1-2) — Foundation & Rules

### Sprint Goal
Thiết lập tiêu chuẩn kỹ thuật chung để toàn team code đồng nhất.

### Scope
- Chốt coding conventions (naming, folder, component/service responsibilities).
- Chốt chuẩn API typing (DTO, response envelope, error model).
- Chốt chuẩn PR checklist + Definition of Done.
- Lập danh sách file/module vi phạm chuẩn hiện tại.

### Deliverables
- `Coding Standards` nội bộ (team doc).
- `PR Template` có checklist bắt buộc.
- `Refactor Backlog` có độ ưu tiên (P0/P1/P2).

### Acceptance Criteria
- 100% thành viên team nắm và dùng chung checklist mới.
- Có danh sách chuẩn hóa cho ít nhất các module: `auth`, `user`, `shared`.

### Risks
- Không thống nhất được quy ước giữa các dev.

### Mitigation
- 1 buổi tech alignment (60-90 phút), ra quyết định cuối cùng bằng văn bản.

---

## Sprint 2 (Tuần 3-4) — Auth Flow Hardening (P0)

### Sprint Goal
Chuẩn hóa luồng đăng nhập/phiên làm việc để giảm rủi ro bảo mật và bug điều hướng.

### Scope
- Thiết kế lại auth lifecycle (login, logout, token invalid/expired, unauthorized handling).
- Thống nhất 1 nơi quản lý token/session.
- Chuẩn hóa guard/interceptor responsibilities.
- Chuẩn hóa popup/error message cho auth flow.

### Deliverables
- Tài liệu auth sequence (ngắn gọn, dễ áp dụng).
- Danh sách migration task theo file/module cho auth.

### Acceptance Criteria
- Auth flow có tài liệu chính thức + checklist test manual.
- Không còn logic token phân tán không kiểm soát trong các điểm P0.

### Risks
- Chạm nhiều điểm dẫn đến regression.

### Mitigation
- Cắt nhỏ PR theo use case, test manual theo checklist trước merge.

---

## Sprint 3 (Tuần 5-6) — Typed Contracts (P0)

### Sprint Goal
Loại bỏ dần `any` ở luồng cốt lõi, tăng type-safety.

### Scope
- Tạo DTO/interface cho auth/user/role/permission.
- Chuẩn hóa kiểu trả về service core.
- Chuẩn hóa error object dùng chung.

### Deliverables
- Bộ type contracts cho module cốt lõi.
- Quy tắc “no-any in core services”.

### Acceptance Criteria
- Core service auth/user không còn `Observable<any>` ở endpoint chính.
- Build/lint pass trong phạm vi thay đổi.

### Risks
- Vỡ kiểu dây chuyền khi cập nhật typing.

### Mitigation
- Refactor theo module nhỏ + mapping adapter tạm thời nếu cần.

---

## Sprint 4 (Tuần 7-8) — UI Architecture Cleanup (P1)

### Sprint Goal
Giảm side-effects trong component, tăng testability và readability.

### Scope
- Tách orchestration/business logic khỏi component (theo pattern team chọn).
- Đồng nhất loading/success/error pattern.
- Đồng nhất message strategy cho popup/toast.

### Deliverables
- 1-2 module làm chuẩn tham chiếu.
- Tài liệu ngắn “component responsibilities”.

### Acceptance Criteria
- Component ở module mẫu chỉ giữ UI logic chính.
- Side-effects chính đã được dồn về service/facade theo chuẩn.

### Risks
- Team chưa quen pattern mới.

### Mitigation
- Pair programming 1-2 PR đầu + code review theo checklist.

---

## Sprint 5 (Tuần 9-10) — Environment & Release Readiness (P1)

### Sprint Goal
Chuẩn hóa triển khai nhiều môi trường và quy trình release.

### Scope
- Chuẩn hóa env strategy (dev/staging/prod).
- Loại hardcode endpoint trong runtime logic.
- Chuẩn hóa release checklist.

### Deliverables
- Tài liệu môi trường triển khai.
- Release checklist trước deploy.

### Acceptance Criteria
- Có thể build/deploy nhất quán cho từng môi trường.
- Không còn cấu hình phụ thuộc máy cá nhân trong luồng chính.

---

## Sprint 6 (Tuần 11-12) — Quality Gates (P2)

### Sprint Goal
Thiết lập cơ chế bảo vệ chất lượng lâu dài.

### Scope
- Tăng lint rules cho naming/import/style.
- Bổ sung test cho flow trọng yếu (auth guard/login/service contract).
- Chuẩn hóa logging strategy theo môi trường.

### Deliverables
- Bộ quality gates trong CI.
- Dashboard theo dõi lint/test/error cơ bản.

### Acceptance Criteria
- PR không đạt quality gate thì không merge.
- Test/lint baseline ổn định qua 2 sprint liên tiếp.

---

## Cách vận hành mỗi sprint

1. Sprint planning: chọn tối đa 1 mục tiêu kỹ thuật lớn/sprint.
2. Chia task: mỗi task <= 2 ngày dev để tránh PR quá lớn.
3. Daily: theo dõi blockers architecture sớm.
4. Mid-sprint review: rà lại scope để tránh trễ.
5. Sprint review: đo KPI trước/sau.
6. Retro: chốt 1 cải tiến quy trình cho sprint sau.

---

## KPI đề xuất theo sprint

- `% core service endpoints đã typed`
- `Số lượng any còn lại trong module P0`
- `Số vi phạm naming/style`
- `Số lỗi auth/session phát sinh trên môi trường test`
- `Tỷ lệ pass checklist manual test`

---

## Gợi ý ưu tiên thực thi ngay tuần này

1. Chốt coding standards + PR checklist.
2. Freeze thay đổi lớn ở module auth trong 1 sprint để chuẩn hóa tập trung.
3. Lập refactor backlog theo file (P0 trước).
4. Bắt đầu từ `auth` → `user` → `shared`.
