# UI Spec - Git Pro Path (MVP)

## Mục tiêu UX

- Người mới nhìn vào biết ngay nên học gì trước.
- Mỗi trang chỉ tập trung 1 việc: học lộ trình, tra lệnh, hoặc làm lab.
- Tối thiểu click để đi tiếp bài kế tiếp.

## Cấu trúc trang

1. Home
   - Hero + CTA bắt đầu học.
   - Metrics (số bài, số level, tổng giờ).
   - Card mô tả từng cấp độ.
   - Tiến độ tổng.
2. Lessons
   - Danh sách bài học có mục tiêu + lệnh trọng tâm.
   - Checklist hoàn thành ở panel bên phải.
3. Commands
   - Search input.
   - Group theo use-case (cơ bản, branch, remote, nâng cao).
4. Labs
   - Tình huống + textarea nhập lệnh.
   - Nút kiểm tra nhanh và xem đáp án gợi ý.

## Quy tắc nội dung

- 1 bài học = 1 kết quả học tập đo được.
- Mỗi command card có: cú pháp, khi dùng, ví dụ, lỗi phổ biến.
- Lab phải có bối cảnh rõ và tiêu chí đúng/sai cụ thể.

## Tương tác

- Tiến độ học lưu localStorage.
- Reset tiến độ để học lại từ đầu.
- Tìm kiếm command theo từ khóa.
