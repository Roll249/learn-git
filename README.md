# Git Pro Path (MVP)

Website học Git/GitHub cho người mới hoàn toàn đến mức chuyên nghiệp theo GitHub Flow.

## Tính năng hiện có

- Lộ trình học 9 bài từ Foundation -> Troubleshooting (bắt đầu bằng local -> GitHub).
- Trang `starter` hướng dẫn từng click GitHub UI cho người mới bắt đầu.
- Checkpoint quiz cho từng bài học, chấm trực tiếp trên trang lesson.
- Trang câu lệnh có giải thích và tìm kiếm.
- Lab mô phỏng với đáp án chuẩn để tự đánh giá.
- Theo dõi tiến độ học bằng localStorage.

## Cách chạy local

Vì đây là static site, chỉ cần mở bằng một static server:

```bash
cd /home/khang/khang_lab/learn-git
python3 -m http.server 5500
```

Mở trình duyệt tại:

- http://localhost:5500/

## Bài học bắt đầu (bắt buộc học trước)

Mục tiêu: từ folder trên máy, tạo repo mới trên GitHub và kết nối/push thành công.

### Cài Git theo hệ điều hành

- Windows: tải tại `https://git-scm.com/download/win`, cài đặt mặc định, rồi kiểm tra `git --version`.
- macOS: chạy `git --version` để kích hoạt cài Xcode Command Line Tools, hoặc `brew install git`.
- Linux:
	- Ubuntu/Debian: `sudo apt update && sudo apt install -y git`
	- Fedora/RHEL: `sudo dnf install -y git`
	- Arch: `sudo pacman -S git`

1. Mở terminal tại folder dự án local.
2. Chạy:

```bash
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
```

3. Vào GitHub -> `New repository` -> chỉ nhập tên repo, không tick tạo sẵn README/.gitignore.
4. Copy URL repo và chạy:

```bash
git remote add origin <repo-url>
git push -u origin main
```

5. Mở lại trang repo trên GitHub để xác nhận code đã lên.

## Cấu trúc chính

- `index.html`: trang tổng quan
- `starter/index.html`: bài học bắt đầu từ local lên GitHub (step-by-step)
- `lessons/index.html`: lộ trình học
- `commands/index.html`: cẩm nang câu lệnh
- `labs/index.html`: thực hành mô phỏng
- `data/*.json`: dữ liệu nội dung
- `assets/styles.css`: giao diện
- `assets/app.js`: logic hiển thị và tương tác
- `docs/*.md`: tài liệu thiết kế bài giảng và UI
- `.github/workflows/deploy-pages.yml`: CI/CD deploy GitHub Pages

## Deploy GitHub Pages

1. Push code lên nhánh `main` của GitHub repository.
2. Vào `Settings -> Pages` và chọn `Source: GitHub Actions`.
3. Workflow `Deploy static site to Pages` sẽ tự chạy và xuất bản website.

## Gợi ý phát triển tiếp

- Bổ sung chế độ instructor view để chạy lớp trực tiếp.
- Mở rộng logic chấm lab theo nhiều đáp án hợp lệ (thay vì strict match một chuỗi lệnh).
