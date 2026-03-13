# Kịch bản bài học Git/GitHub (Người mới hoàn toàn)

## Format tiêu chuẩn mỗi buổi (50-70 phút)

1. Mở bài (5 phút)
   - Nêu vấn đề thực tế: “Tại sao team dễ ghi đè code nhau?”
   - Chốt mục tiêu đầu ra của buổi.
2. Demo có dẫn dắt (15-20 phút)
   - Giảng viên thao tác thật trên terminal + GitHub.
   - Mỗi lệnh đều trả lời 3 câu: dùng khi nào, rủi ro gì, kiểm tra kết quả ra sao.
3. Lab thực hành (20-30 phút)
   - Học viên làm theo tình huống, không chép máy móc.
   - Bắt buộc ghi commit message có chủ đích.
4. Debrief (10 phút)
   - So sánh nhiều cách giải.
   - Chốt checklist “lần sau làm lại được”.

## Chuỗi 9 bài học gợi ý

- B0: Từ folder local -> tạo repo GitHub mới -> push lần đầu.
- B1: Mental model của Git (working tree, staging, commit).
- B2: Commit chất lượng và lịch sử dễ đọc.
- B3: Branching cơ bản + merge.
- B4: Kết nối GitHub, push/pull đúng cách.
- B5: GitHub Flow: branch -> PR -> review -> merge.
- B6: Xử lý conflict có quy trình.
- B7: Rebase/cherry-pick cho lịch sử chuyên nghiệp.
- B8: Revert/reset/reflog để xử lý sự cố.

## Script mẫu bài GitHub Flow

- Hook: "Nếu 5 người cùng sửa một file thì làm sao không đạp code nhau?"
- Demo:
  1) Tạo branch feature.
  2) Commit nhỏ theo từng ý.
  3) Push và mở PR.
  4) Nhận review và cập nhật.
  5) Merge và xóa branch.
- Lab:
  - Mỗi nhóm xử lý một PR giả lập có thay đổi chồng lấn.
- Debrief:
  - Checklist PR tốt: scope nhỏ, message rõ, có test/ảnh minh chứng.
