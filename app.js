// === MyEnglish App ===

// 상태 관리
let state = {
    // 레벨/경험치
    totalXP: 0,
    level: 1,
    xpForNextLevel: 100,
    streak: 0,
    lastStudyDate: null,

    // 모드별 레벨
    convLevel: 1,
    listenLevel: 1,
    vocabLevel: 1,
    gramLevel: 1,

    // 오늘 통계
    todayLessons: 0,
    todayXP: 0,
    todayCorrect: 0,
    todayTotal: 0,
    todayDate: null,

    // 현재 레슨 상태
    currentMode: null,
    currentTopic: null,
    currentIndex: 0,
    lessonCorrect: 0,
    lessonTotal: 0,
    lastMode: null
};

// 초기화
function init() {
    loadState();
    updateStreak();
    updateUI();
    showScreen('dashboard');
}

// === 상태 저장/불러오기 ===
function loadState() {
    const saved = localStorage.getItem('myenglish_state');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
    }
    // 오늘 날짜 확인
    const today = new Date().toDateString();
    if (state.todayDate !== today) {
        state.todayLessons = 0;
        state.todayXP = 0;
        state.todayCorrect = 0;
        state.todayTotal = 0;
        state.todayDate = today;
    }
}

function saveState() {
    localStorage.setItem('myenglish_state', JSON.stringify(state));
}

// === 연속 학습일 ===
function updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (state.lastStudyDate === today) {
        // 오늘 이미 학습함
        return;
    } else if (state.lastStudyDate === yesterday) {
        // 어제 학습함 -> streak 유지 (학습 시 +1)
    } else if (state.lastStudyDate !== null) {
        // streak 끊김
        state.streak = 0;
    }
}

function recordStudy() {
    const today = new Date().toDateString();
    if (state.lastStudyDate !== today) {
        state.streak++;
        state.lastStudyDate = today;
    }
    saveState();
}

// === UI 업데이트 ===
function updateUI() {
    document.getElementById('streak-count').textContent = state.streak;
    document.getElementById('total-xp').textContent = state.totalXP;
    document.getElementById('current-level').textContent = state.level;

    // 레벨 진행도
    const xpInLevel = state.totalXP - getXPForLevel(state.level);
    const xpNeeded = getXPForLevel(state.level + 1) - getXPForLevel(state.level);
    const percent = Math.min((xpInLevel / xpNeeded) * 100, 100);
    document.getElementById('level-progress-bar').style.width = percent + '%';
    document.getElementById('level-progress-text').textContent = `${xpInLevel} / ${xpNeeded} XP`;

    // 모드별 레벨
    document.getElementById('conv-level').textContent = 'Lv.' + state.convLevel;
    document.getElementById('listen-level').textContent = 'Lv.' + state.listenLevel;
    document.getElementById('vocab-level').textContent = 'Lv.' + state.vocabLevel;
    document.getElementById('gram-level').textContent = 'Lv.' + state.gramLevel;

    // 오늘 통계
    document.getElementById('today-lessons').textContent = state.todayLessons;
    document.getElementById('today-xp').textContent = state.todayXP;
    const rate = state.todayTotal > 0 ? Math.round((state.todayCorrect / state.todayTotal) * 100) : 0;
    document.getElementById('today-correct').textContent = rate + '%';
}

function getXPForLevel(level) {
    // 레벨별 누적 XP: 1->0, 2->100, 3->250, 4->450...
    if (level <= 1) return 0;
    return Math.floor(50 * (level - 1) * level);
}

function addXP(amount) {
    state.totalXP += amount;
    state.todayXP += amount;

    // 레벨업 체크
    while (state.totalXP >= getXPForLevel(state.level + 1)) {
        state.level++;
    }
    saveState();
    updateUI();
}

// === 화면 전환 ===
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + screenId).classList.add('active');
    if (screenId === 'dashboard') {
        updateUI();
    }
}

function startMode(mode) {
    state.currentMode = mode;
    state.lastMode = mode;
    showScreen(mode);
    showTopicSelector(mode);
}

// === 토픽 선택 ===
function showTopicSelector(mode) {
    let topics, containerId, selectorId, bodyId;

    switch(mode) {
        case 'conversation':
            topics = conversationData;
            containerId = 'conv-topics';
            selectorId = 'conv-topic-selector';
            bodyId = 'conv-lesson-body';
            break;
        case 'listening':
            topics = listeningData;
            containerId = 'listen-topics';
            selectorId = 'listen-topic-selector';
            bodyId = 'listen-lesson-body';
            break;
        case 'vocabulary':
            topics = vocabularyData;
            containerId = 'vocab-topics';
            selectorId = 'vocab-topic-selector';
            bodyId = 'vocab-lesson-body';
            break;
        case 'grammar':
            topics = grammarData;
            containerId = 'gram-topics';
            selectorId = 'gram-topic-selector';
            bodyId = 'gram-lesson-body';
            break;
    }

    // 토픽 선택 UI 표시
    document.getElementById(selectorId).style.display = 'block';
    document.getElementById(bodyId).style.display = 'none';

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    Object.keys(topics).forEach(key => {
        const topic = topics[key];
        const btn = document.createElement('button');
        btn.className = 'topic-btn';
        btn.innerHTML = `<span class="topic-emoji">${topic.emoji}</span><span class="topic-name">${topic.name}</span>`;
        btn.onclick = () => selectTopic(mode, key);
        container.appendChild(btn);
    });
}

function selectTopic(mode, topicKey) {
    state.currentTopic = topicKey;
    state.currentIndex = 0;
    state.lessonCorrect = 0;
    state.lessonTotal = 0;

    switch(mode) {
        case 'conversation': startConversationLesson(); break;
        case 'listening': startListeningLesson(); break;
        case 'vocabulary': startVocabLesson(); break;
        case 'grammar': startGrammarLesson(); break;
    }
}

// === 회화 연습 모드 ===
function startConversationLesson() {
    document.getElementById('conv-topic-selector').style.display = 'none';
    document.getElementById('conv-lesson-body').style.display = 'block';

    const topic = conversationData[state.currentTopic];
    const totalQuizzes = topic.dialogues.reduce((sum, d) => sum + d.quiz.length, 0);
    state.lessonTotal = 0;
    state.lessonCorrect = 0;

    showConversationQuestion();
}

function showConversationQuestion() {
    const topic = conversationData[state.currentTopic];
    const dialogues = topic.dialogues;

    // 현재 대화와 퀴즈 인덱스 계산
    let quizIndex = state.currentIndex;
    let dialogueIndex = 0;
    let localQuizIndex = 0;

    let found = false;
    for (let i = 0; i < dialogues.length; i++) {
        if (quizIndex < dialogues[i].quiz.length) {
            dialogueIndex = i;
            localQuizIndex = quizIndex;
            found = true;
            break;
        }
        quizIndex -= dialogues[i].quiz.length;
    }

    if (!found) {
        completeLesson('conversation');
        return;
    }

    const dialogue = dialogues[dialogueIndex];
    const quiz = dialogue.quiz[localQuizIndex];
    const totalQuizzes = dialogues.reduce((sum, d) => sum + d.quiz.length, 0);

    // 진행 바 업데이트
    const progress = ((state.currentIndex) / totalQuizzes) * 100;
    document.getElementById('conv-progress-bar').style.width = progress + '%';
    document.getElementById('conv-progress-text').textContent = `${state.currentIndex + 1}/${totalQuizzes}`;

    // 상황 배지
    document.getElementById('conv-situation').textContent = '📍 ' + dialogue.situation;

    // 대화 표시
    const dialogueBox = document.getElementById('conv-dialogue');
    dialogueBox.innerHTML = dialogue.lines.map(line => `
        <div class="dialogue-line">
            <div class="dialogue-speaker">${line.speaker}</div>
            <div class="dialogue-text">${line.en}</div>
            <div class="dialogue-text korean">${line.ko}</div>
        </div>
    `).join('');

    // 문제 표시
    document.getElementById('conv-question').innerHTML = `
        <h3>이 문장을 영어로 말해보세요</h3>
        <div class="question-text">${quiz.question}</div>
    `;

    // 선택지 표시
    const shuffled = shuffleArray([...quiz.choices]);
    document.getElementById('conv-answer').innerHTML = `
        <div class="answer-choices">
            ${shuffled.map(choice => `
                <button class="choice-btn" onclick="checkConvAnswer(this, '${escapeQuotes(choice)}', '${escapeQuotes(quiz.answer)}')">${choice}</button>
            `).join('')}
        </div>
    `;

    // 피드백 초기화
    document.getElementById('conv-feedback').className = 'feedback-area';
    document.getElementById('conv-feedback').innerHTML = '';
    document.getElementById('conv-next-btn').style.display = 'none';
}

function checkConvAnswer(btn, selected, correct) {
    const buttons = document.querySelectorAll('#conv-answer .choice-btn');
    buttons.forEach(b => {
        b.classList.add('disabled');
        if (b.textContent === correct) b.classList.add('correct');
    });

    state.lessonTotal++;
    state.todayTotal++;

    const feedback = document.getElementById('conv-feedback');
    if (selected === correct) {
        btn.classList.add('correct');
        feedback.className = 'feedback-area correct';
        feedback.innerHTML = '<div class="feedback-title">정답! 👏</div><div>잘 하셨어요!</div>';
        state.lessonCorrect++;
        state.todayCorrect++;
        addXP(10);
    } else {
        btn.classList.add('wrong');
        feedback.className = 'feedback-area wrong';
        feedback.innerHTML = `<div class="feedback-title">아쉬워요 😅</div><div>정답: ${correct}</div>`;
    }

    document.getElementById('conv-next-btn').style.display = 'block';
    recordStudy();
}

function nextConversation() {
    state.currentIndex++;
    showConversationQuestion();
}

// === 듣기 연습 모드 ===
function startListeningLesson() {
    document.getElementById('listen-topic-selector').style.display = 'none';
    document.getElementById('listen-lesson-body').style.display = 'block';
    state.lessonTotal = 0;
    state.lessonCorrect = 0;
    showListeningQuestion();
}

function showListeningQuestion() {
    const topic = listeningData[state.currentTopic];
    const sentences = topic.sentences;

    if (state.currentIndex >= sentences.length) {
        completeLesson('listening');
        return;
    }

    const sentence = sentences[state.currentIndex];

    // 진행 바
    const progress = (state.currentIndex / sentences.length) * 100;
    document.getElementById('listen-progress-bar').style.width = progress + '%';
    document.getElementById('listen-progress-text').textContent = `${state.currentIndex + 1}/${sentences.length}`;

    // 문제 영역
    document.getElementById('listen-question').innerHTML = `
        <h3>듣고 빈칸을 채우세요 🎧</h3>
        <div class="question-text" style="font-size:14px; color:#666; margin-top:8px;">💡 힌트: ${sentence.hint}</div>
    `;

    // 답변 영역 - 받아쓰기
    document.getElementById('listen-answer').innerHTML = `
        <input type="text" class="answer-input" id="listen-input" placeholder="들은 영어 문장을 입력하세요..." onkeydown="if(event.key==='Enter')checkListenAnswer()">
        <button class="btn-submit" onclick="checkListenAnswer()">확인</button>
    `;

    // 피드백 초기화
    document.getElementById('listen-feedback').className = 'feedback-area';
    document.getElementById('listen-feedback').innerHTML = '';
    document.getElementById('listen-next-btn').style.display = 'none';

    // 자동으로 한번 재생
    setTimeout(() => playListening(), 500);
}

function playListening() {
    const topic = listeningData[state.currentTopic];
    const sentence = topic.sentences[state.currentIndex];
    speak(sentence.en, 1.0);
}

function playListeningSlow() {
    const topic = listeningData[state.currentTopic];
    const sentence = topic.sentences[state.currentIndex];
    speak(sentence.en, 0.6);
}

function speak(text, rate) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = 1;

        // 영어 음성 선택
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;

        window.speechSynthesis.speak(utterance);
    } else {
        alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
    }
}

function checkListenAnswer() {
    const topic = listeningData[state.currentTopic];
    const sentence = topic.sentences[state.currentIndex];
    const input = document.getElementById('listen-input');
    const userAnswer = input.value.trim();

    if (!userAnswer) return;

    input.disabled = true;
    state.lessonTotal++;
    state.todayTotal++;

    const correct = sentence.en;
    const similarity = calculateSimilarity(userAnswer.toLowerCase(), correct.toLowerCase());

    const feedback = document.getElementById('listen-feedback');

    if (similarity >= 0.8) {
        feedback.className = 'feedback-area correct';
        feedback.innerHTML = `<div class="feedback-title">${similarity >= 0.95 ? '완벽해요! 🎉' : '거의 맞았어요! 👍'}</div>
            <div>정답: ${correct}</div>
            <div style="margin-top:4px; font-size:13px; color:#666;">해석: ${sentence.ko}</div>`;
        state.lessonCorrect++;
        state.todayCorrect++;
        addXP(similarity >= 0.95 ? 15 : 10);
    } else {
        feedback.className = 'feedback-area wrong';
        feedback.innerHTML = `<div class="feedback-title">다시 들어보세요 😅</div>
            <div>정답: ${correct}</div>
            <div style="margin-top:4px; font-size:13px; color:#666;">해석: ${sentence.ko}</div>`;
    }

    document.getElementById('listen-next-btn').style.display = 'block';
    recordStudy();
}

function nextListening() {
    state.currentIndex++;
    showListeningQuestion();
}

// 문자열 유사도 (간단한 레벤슈타인 기반)
function calculateSimilarity(str1, str2) {
    // 구두점 제거
    str1 = str1.replace(/[.,!?;:'"]/g, '').trim();
    str2 = str2.replace(/[.,!?;:'"]/g, '').trim();

    if (str1 === str2) return 1;

    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    let matchCount = 0;

    words1.forEach(w => {
        if (words2.includes(w)) matchCount++;
    });

    return matchCount / Math.max(words1.length, words2.length);
}

// === 단어 학습 모드 ===
function startVocabLesson() {
    document.getElementById('vocab-topic-selector').style.display = 'none';
    document.getElementById('vocab-lesson-body').style.display = 'block';
    state.lessonTotal = 0;
    state.lessonCorrect = 0;
    showVocabQuestion();
}

function showVocabQuestion() {
    const topic = vocabularyData[state.currentTopic];
    const words = topic.words;

    if (state.currentIndex >= words.length) {
        completeLesson('vocabulary');
        return;
    }

    const word = words[state.currentIndex];

    // 진행 바
    const progress = (state.currentIndex / words.length) * 100;
    document.getElementById('vocab-progress-bar').style.width = progress + '%';
    document.getElementById('vocab-progress-text').textContent = `${state.currentIndex + 1}/${words.length}`;

    // 카드 영역
    document.getElementById('vocab-card-area').innerHTML = `
        <div class="vocab-card">
            <div class="vocab-word">${word.en}</div>
            <div class="vocab-phonetic">${word.phonetic}</div>
            <div class="vocab-hint" onclick="this.textContent='예문: ${escapeQuotes(word.example)}'">💡 예문 보기 (클릭)</div>
        </div>
    `;

    // 4지선다 - 정답 + 같은 주제에서 랜덤 3개
    const otherWords = words.filter((_, i) => i !== state.currentIndex);
    const wrongChoices = shuffleArray(otherWords).slice(0, 3).map(w => w.ko);
    const allChoices = shuffleArray([word.ko, ...wrongChoices]);

    document.getElementById('vocab-answer').innerHTML = `
        <div class="answer-choices">
            ${allChoices.map(choice => `
                <button class="choice-btn" onclick="checkVocabAnswer(this, '${escapeQuotes(choice)}', '${escapeQuotes(word.ko)}')">${choice}</button>
            `).join('')}
        </div>
    `;

    // TTS 재생
    setTimeout(() => speak(word.en, 0.9), 300);

    // 피드백 초기화
    document.getElementById('vocab-feedback').className = 'feedback-area';
    document.getElementById('vocab-feedback').innerHTML = '';
    document.getElementById('vocab-next-btn').style.display = 'none';
}

function checkVocabAnswer(btn, selected, correct) {
    const buttons = document.querySelectorAll('#vocab-answer .choice-btn');
    buttons.forEach(b => {
        b.classList.add('disabled');
        if (b.textContent === correct) b.classList.add('correct');
    });

    state.lessonTotal++;
    state.todayTotal++;

    const feedback = document.getElementById('vocab-feedback');
    if (selected === correct) {
        btn.classList.add('correct');
        feedback.className = 'feedback-area correct';
        feedback.innerHTML = '<div class="feedback-title">정답! 🎯</div>';
        state.lessonCorrect++;
        state.todayCorrect++;
        addXP(8);
    } else {
        btn.classList.add('wrong');
        feedback.className = 'feedback-area wrong';
        feedback.innerHTML = `<div class="feedback-title">아쉬워요</div><div>정답: ${correct}</div>`;
    }

    document.getElementById('vocab-next-btn').style.display = 'block';
    recordStudy();
}

function nextVocab() {
    state.currentIndex++;
    showVocabQuestion();
}

// === 문법 학습 모드 ===
function startGrammarLesson() {
    document.getElementById('gram-topic-selector').style.display = 'none';
    document.getElementById('gram-lesson-body').style.display = 'block';
    state.lessonTotal = 0;
    state.lessonCorrect = 0;
    showGrammarQuestion();
}

function showGrammarQuestion() {
    const topic = grammarData[state.currentTopic];
    const lessons = topic.lessons;

    // 현재 레슨과 문제 인덱스 계산
    let exIndex = state.currentIndex;
    let lessonIndex = 0;
    let localExIndex = 0;

    let found = false;
    for (let i = 0; i < lessons.length; i++) {
        if (exIndex < lessons[i].exercises.length) {
            lessonIndex = i;
            localExIndex = exIndex;
            found = true;
            break;
        }
        exIndex -= lessons[i].exercises.length;
    }

    if (!found) {
        completeLesson('grammar');
        return;
    }

    const lesson = lessons[lessonIndex];
    const exercise = lesson.exercises[localExIndex];
    const totalExercises = lessons.reduce((sum, l) => sum + l.exercises.length, 0);

    // 진행 바
    const progress = (state.currentIndex / totalExercises) * 100;
    document.getElementById('gram-progress-bar').style.width = progress + '%';
    document.getElementById('gram-progress-text').textContent = `${state.currentIndex + 1}/${totalExercises}`;

    // 문법 설명
    document.getElementById('gram-explanation').innerHTML = `
        <h3>${lesson.title}</h3>
        <div class="pattern">${lesson.pattern}</div>
        <div class="example">${lesson.examples.map(e => '• ' + e).join('<br>')}</div>
    `;

    // 문제
    document.getElementById('gram-question').innerHTML = `
        <h3>영어로 표현해보세요</h3>
        <div class="question-text">${exercise.question}</div>
    `;

    // 선택지
    const shuffled = shuffleArray([...exercise.choices]);
    document.getElementById('gram-answer').innerHTML = `
        <div class="answer-choices">
            ${shuffled.map(choice => `
                <button class="choice-btn" onclick="checkGramAnswer(this, '${escapeQuotes(choice)}', '${escapeQuotes(exercise.answer)}')">${choice}</button>
            `).join('')}
        </div>
    `;

    // 피드백 초기화
    document.getElementById('gram-feedback').className = 'feedback-area';
    document.getElementById('gram-feedback').innerHTML = '';
    document.getElementById('gram-next-btn').style.display = 'none';
}

function checkGramAnswer(btn, selected, correct) {
    const buttons = document.querySelectorAll('#gram-answer .choice-btn');
    buttons.forEach(b => {
        b.classList.add('disabled');
        if (b.textContent === correct) b.classList.add('correct');
    });

    state.lessonTotal++;
    state.todayTotal++;

    const feedback = document.getElementById('gram-feedback');
    if (selected === correct) {
        btn.classList.add('correct');
        feedback.className = 'feedback-area correct';
        feedback.innerHTML = '<div class="feedback-title">맞았어요! ✨</div><div>이 패턴을 잘 기억하세요!</div>';
        state.lessonCorrect++;
        state.todayCorrect++;
        addXP(10);
    } else {
        btn.classList.add('wrong');
        feedback.className = 'feedback-area wrong';
        feedback.innerHTML = `<div class="feedback-title">아쉬워요</div><div>정답: ${correct}</div>`;
    }

    document.getElementById('gram-next-btn').style.display = 'block';
    recordStudy();
}

function nextGrammar() {
    state.currentIndex++;
    showGrammarQuestion();
}

// === 레슨 완료 ===
function completeLesson(mode) {
    state.todayLessons++;

    // 모드별 레벨업 체크
    const modeXP = state.lessonCorrect * 10;
    switch(mode) {
        case 'conversation':
            checkModeLevelUp('convLevel', state.lessonCorrect);
            break;
        case 'listening':
            checkModeLevelUp('listenLevel', state.lessonCorrect);
            break;
        case 'vocabulary':
            checkModeLevelUp('vocabLevel', state.lessonCorrect);
            break;
        case 'grammar':
            checkModeLevelUp('gramLevel', state.lessonCorrect);
            break;
    }

    // 완료 화면 표시
    document.getElementById('complete-correct').textContent = state.lessonCorrect;
    document.getElementById('complete-total').textContent = state.lessonTotal;
    document.getElementById('complete-xp').textContent = '+' + (state.lessonCorrect * 10);

    saveState();
    showScreen('complete');
}

function checkModeLevelUp(levelKey, correctCount) {
    // 5문제 이상 맞으면 레벨업 기회
    if (correctCount >= 4 && state[levelKey] < 10) {
        state[levelKey]++;
    }
    saveState();
}

function retryLesson() {
    if (state.lastMode) {
        startMode(state.lastMode);
    }
}

// === 유틸리티 ===
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeQuotes(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// TTS 음성 로드 (브라우저에 따라 비동기)
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

// 앱 시작
document.addEventListener('DOMContentLoaded', init);
