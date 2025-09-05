const quizData = [
    {
        question: "ステーブルコインの最大の特徴は何でしょう？",
        options: [
            "価格が大きく変動する",
            "価格が安定している",
            "マイニングで獲得できる",
            "発行数に上限がある"
        ],
        correct: 1,
        explanation: "ステーブルコインは1コイン=100円のように価格が安定しているのが最大の特徴です。"
    },
    {
        question: "日本でステーブルコインが本格的にサービス開始されるのはいつから？",
        options: [
            "2020年",
            "2022年",
            "2023年6月",
            "2025年秋"
        ],
        correct: 3,
        explanation: "2023年6月に法整備が完了し、2025年秋から大手金融機関や決済事業者が本格的なサービスを開始予定です。"
    },
    {
        question: "ステーブルコインの価値の裏付けとなるものは？",
        options: [
            "金（ゴールド）",
            "現金や国債などの安全資産",
            "ビットコイン",
            "企業の株式"
        ],
        correct: 1,
        explanation: "発行会社が同額の現金や国債などの安全資産を保有することで、価値を裏付けています。"
    },
    {
        question: "ステーブルコインのメリットとして正しくないものはどれ？",
        options: [
            "24時間365日送金可能",
            "手数料が安い",
            "価格が大きく上昇する可能性がある",
            "国際送金が簡単"
        ],
        correct: 2,
        explanation: "ステーブルコインは価格が安定しているため、投資による大きな値上がり益は期待できません。"
    },
    {
        question: "日本のステーブルコイン規制の特徴として正しいものは？",
        options: [
            "規制が全くない",
            "信託銀行での分別管理が義務付けられている",
            "個人は利用できない",
            "海外送金には使えない"
        ],
        correct: 1,
        explanation: "日本では発行体に信託銀行での分別管理を義務付けるなど、厳格な規制により利用者保護を図っています。"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizActive = false;

// ナビゲーション機能
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetSection = this.dataset.section;
        
        // アクティブなナビゲーションボタンを更新
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // セクションを切り替え
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetSection).classList.add('active');
        
        // クイズセクションが選択された場合、クイズを開始
        if (targetSection === 'quiz' && !quizActive) {
            startQuiz();
        }
    });
});

// クイズ開始関数
function startQuiz() {
    quizActive = true;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    loadQuestion();
}

// 問題読み込み関数
function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    // 選択肢ボタンを作成
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    // フィードバックと次のボタンを非表示に
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    
    // プログレスバーを更新
    updateProgressBar();
}

// 回答選択処理
function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');
    
    // すべてのオプションを無効化
    options.forEach(option => option.disabled = true);
    
    // 正解・不正解の表示
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
        showFeedback(true, question.explanation);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        showFeedback(false, question.explanation);
    }
    
    // 次のボタンを表示
    document.getElementById('next-btn').classList.remove('hidden');
}

// フィードバック表示
function showFeedback(isCorrect, explanation) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.innerHTML = `
        <div class="${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}">
            ${isCorrect ? '✅ 正解！' : '❌ 不正解'}
        </div>
        <p>${explanation}</p>
    `;
    feedbackEl.classList.remove('hidden');
}

// プログレスバー更新
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
}

// 次のボタンのイベントリスナー
document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// 結果表示
function showResult() {
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    
    let message = '';
    if (score === 5) {
        message = '🎉 完璧！ステーブルコインマスターです！';
    } else if (score >= 3) {
        message = '👍 よくできました！基本はバッチリです！';
    } else {
        message = '💪 もう少し頑張りましょう！復習してみてください。';
    }
    document.getElementById('result-message').textContent = message;
}

// 再スタートボタンのイベントリスナー
document.getElementById('restart-btn').addEventListener('click', startQuiz);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// アニメーション対象の要素を観測
document.querySelectorAll('.info-card, .benefit-card, .timeline-item, .risk-card').forEach(el => {
    observer.observe(el);
});

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 最初のセクションをアクティブに設定
    document.querySelector('.nav-btn[data-section="intro"]').classList.add('active');
    document.getElementById('intro').classList.add('active');
});