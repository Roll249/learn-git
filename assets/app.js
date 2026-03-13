const storageKey = 'gitpro-progress-v1';

const loadData = async (path) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Không tải được ${path}`);
    return res.json();
};

const getProgress = () => {
    try {
        const raw = JSON.parse(localStorage.getItem(storageKey));
        if (!raw) {
            return { done: {}, quiz: {} };
        }

        const isLegacy = Object.values(raw).every((value) => typeof value === 'boolean');
        if (isLegacy) {
            return { done: raw, quiz: {} };
        }

        return {
            done: raw.done || {},
            quiz: raw.quiz || {},
        };
    } catch {
        return { done: {}, quiz: {} };
    }
};

const setProgress = (progress) => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
};

const markDone = (id, done) => {
    const progress = getProgress();
    progress.done[id] = done;
    setProgress(progress);
};

const markQuizPassed = (id, passed) => {
    const progress = getProgress();
    progress.quiz[id] = passed;
    setProgress(progress);
};

const progressPercent = (lessons) => {
    const progress = getProgress();
    const total = lessons.length;
    const done = lessons.filter((item) => progress.done[item.id]).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
};

const quizPercent = (lessons) => {
    const progress = getProgress();
    const total = lessons.length;
    const passed = lessons.filter((item) => progress.quiz[item.id]).length;
    return total === 0 ? 0 : Math.round((passed / total) * 100);
};

const renderHome = async () => {
    const data = await loadData('data/lessons.json');
    const metrics = document.getElementById('home-metrics');
    const pathCards = document.getElementById('path-cards');
    const progressBar = document.getElementById('overall-progress');
    const progressText = document.getElementById('overall-progress-text');

    const p = progressPercent(data.lessons);
    progressBar.style.width = `${p}%`;
    progressText.textContent = `${p}% hoàn thành`;

    metrics.innerHTML = `
    <article class="card"><h3>${data.lessons.length}</h3><p>Bài học chính</p></article>
    <article class="card"><h3>${data.levels.length}</h3><p>Cấp độ lộ trình</p></article>
    <article class="card"><h3>${data.totalHours}</h3><p>Giờ học đề xuất</p></article>
  `;

    pathCards.innerHTML = data.levels
        .map(
            (item) => `
      <article class="card">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </article>
    `,
        )
        .join('');

    const quizP = quizPercent(data.lessons);
    progressText.textContent = `${p}% hoàn thành bài | ${quizP}% pass checkpoint`;
};

const renderLessons = async () => {
    const data = await loadData('../data/lessons.json');
    const list = document.getElementById('lesson-list');
    const progressList = document.getElementById('progress-list');
    const quizScore = document.getElementById('quiz-score');
    const progress = getProgress();

    list.innerHTML = data.lessons
        .map(
            (lesson) => `
      <section class="lesson-item">
        <h3>${lesson.title}</h3>
        <div class="lesson-meta">
          <span class="pill">${lesson.level}</span>
          <span class="pill">${lesson.duration}</span>
          <span class="pill">${lesson.type}</span>
        </div>
        <p>${lesson.goal}</p>
        <p class="small"><strong>Lệnh trọng tâm:</strong> ${lesson.commands.map((c) => `<code>${c}</code>`).join(' ')}</p>
                ${
                    lesson.steps
                        ? `<div class="steps-box">
                                <p><strong>Checklist thao tác:</strong></p>
                                <ol>
                                    ${lesson.steps.map((step) => `<li>${step}</li>`).join('')}
                                </ol>
                            </div>`
                        : ''
                }
        <button class="btn" data-mark="${lesson.id}">${progress.done[lesson.id] ? 'Đánh dấu chưa học' : 'Đánh dấu hoàn thành'}</button>
        <div class="quiz-box">
          <p><strong>Checkpoint:</strong> ${lesson.quiz.question}</p>
          <div class="quiz-options">
            ${lesson.quiz.options
                    .map(
                        (option, index) => `
                <label>
                  <input type="radio" name="quiz-${lesson.id}" value="${index}" />
                  ${option}
                </label>
              `,
                    )
                    .join('')}
          </div>
          <button class="btn" data-quiz-check="${lesson.id}">Chấm checkpoint</button>
          <div class="result-box" id="quiz-result-${lesson.id}">${progress.quiz[lesson.id] ? '✅ Đã pass checkpoint.' : 'Chưa chấm checkpoint.'}</div>
        </div>
      </section>
    `,
        )
        .join('');

    progressList.innerHTML = data.lessons
        .map(
            (lesson) => `
      <li>
        <span>${lesson.title}</span>
        <span>${progress.done[lesson.id] ? '✅' : '⬜'} | ${progress.quiz[lesson.id] ? '🧠' : '❔'}</span>
      </li>
    `,
        )
        .join('');

    const qp = quizPercent(data.lessons);
    if (quizScore) {
        quizScore.textContent = `Checkpoint pass: ${qp}%`;
    }

    list.onclick = (event) => {
        const button = event.target.closest('[data-mark]');
        const quizButton = event.target.closest('[data-quiz-check]');

        if (button) {
            const lessonId = button.getAttribute('data-mark');
            const current = getProgress().done[lessonId] || false;
            markDone(lessonId, !current);
            renderLessons();
            return;
        }

        if (quizButton) {
            const lessonId = quizButton.getAttribute('data-quiz-check');
            const lesson = data.lessons.find((item) => item.id === lessonId);
            const selected = list.querySelector(`input[name="quiz-${lessonId}"]:checked`);
            const box = document.getElementById(`quiz-result-${lessonId}`);

            if (!selected) {
                box.textContent = '⚠️ Bạn cần chọn một đáp án trước khi chấm.';
                return;
            }

            const selectedIndex = Number(selected.value);
            const isCorrect = selectedIndex === lesson.quiz.answer;

            box.textContent = isCorrect
                ? `✅ Chính xác. ${lesson.quiz.explain}`
                : `❌ Chưa đúng. ${lesson.quiz.explain}`;

            if (isCorrect) {
                markQuizPassed(lessonId, true);
                renderLessons();
            }
        }
    };

    const resetButton = document.getElementById('reset-progress');
    resetButton.onclick = () => {
        localStorage.removeItem(storageKey);
        renderLessons();
    };
};

const renderCommands = async () => {
    const data = await loadData('../data/commands.json');
    const wrapper = document.getElementById('command-groups');
    const searchInput = document.getElementById('command-search');

    const draw = (keyword = '') => {
        const term = keyword.trim().toLowerCase();
        wrapper.innerHTML = data.groups
            .map((group) => {
                const items = group.items.filter((item) => {
                    if (!term) return true;
                    const text = `${item.command} ${item.when} ${item.example} ${item.mistake}`.toLowerCase();
                    return text.includes(term);
                });

                if (items.length === 0) return '';

                return `
          <article class="command-group">
            <h3>${group.name}</h3>
            ${items
                        .map(
                            (item) => `
                <div class="command-item">
                  <p><code>${item.command}</code></p>
                  <p><strong>Khi dùng:</strong> ${item.when}</p>
                  <p><strong>Ví dụ:</strong> <code>${item.example}</code></p>
                  <p class="small"><strong>Lỗi hay gặp:</strong> ${item.mistake}</p>
                </div>
              `,
                        )
                        .join('')}
          </article>
        `;
            })
            .join('');
    };

    draw();
    searchInput?.addEventListener('input', (event) => draw(event.target.value));
};

const evaluateLab = (input, expected) => {
    const normalize = (text) =>
        text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .join('\n');

    return normalize(input) === normalize(expected);
};

const renderLabs = async () => {
    const data = await loadData('../data/labs.json');
    const list = document.getElementById('lab-list');

    list.innerHTML = data.labs
        .map(
            (lab) => `
      <section class="lab-item" data-lab="${lab.id}">
        <h3>${lab.title}</h3>
        <p><strong>Bối cảnh:</strong> ${lab.context}</p>
        <p><strong>Nhiệm vụ:</strong> ${lab.task}</p>
        <p class="small">Nhập chuỗi lệnh theo thứ tự, mỗi lệnh một dòng.</p>
        <textarea placeholder="Ví dụ:\ngit checkout -b feat/login\ngit add .\ngit commit -m \"feat: add login\""></textarea>
        <div>
          <button class="btn" data-check="${lab.id}">Kiểm tra</button>
          <button class="btn" data-show="${lab.id}">Xem đáp án</button>
        </div>
        <div class="result-box" id="result-${lab.id}">Chưa chấm.</div>
      </section>
    `,
        )
        .join('');

    list.addEventListener('click', (event) => {
        const check = event.target.closest('[data-check]');
        const show = event.target.closest('[data-show]');

        if (check) {
            const id = check.getAttribute('data-check');
            const lab = data.labs.find((item) => item.id === id);
            const card = check.closest('[data-lab]');
            const input = card.querySelector('textarea').value;
            const box = document.getElementById(`result-${id}`);
            const ok = evaluateLab(input, lab.expected);
            box.textContent = ok
                ? '✅ Chuẩn! Chuỗi lệnh của bạn hợp lý với đáp án mục tiêu.'
                : '❌ Chưa khớp đáp án mục tiêu. Hãy kiểm tra thứ tự thao tác hoặc lệnh còn thiếu.';
            return;
        }

        if (show) {
            const id = show.getAttribute('data-show');
            const lab = data.labs.find((item) => item.id === id);
            const box = document.getElementById(`result-${id}`);
            box.innerHTML = `<strong>Đáp án gợi ý:</strong><br><code>${lab.expected.replace(/\n/g, '<br>')}</code><br><span class="small">Giải thích: ${lab.explain}</span>`;
        }
    });
};

const run = async () => {
    const page = document.body.dataset.page;
    if (page === 'home') return renderHome();
    if (page === 'lessons') return renderLessons();
    if (page === 'commands') return renderCommands();
    if (page === 'labs') return renderLabs();
};

run().catch((error) => {
    console.error(error);
});
