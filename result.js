// result.js: localStorage からスコアを読み取り結果を表示する

const $resultBox = document.getElementById('result-box'); // 結果表示要素
const $restartBtn = document.getElementById('restart-btn'); // 再挑戦ボタン
const $toStartpageBtn = document.getElementById('to-startpage-btn'); // スタート画面へ戻るボタン

// --- 設定: API ベース URL（デプロイ後に本番URLに差し替えてください）
const API_BASE = window.API_BASE || 'https://YOUR_API.execute-api.region.amazonaws.com/prod';

// localStorage からデータを取り出す
const $rawScore = localStorage.getItem('quizScore');
const $rawLength = localStorage.getItem('quizLength');

if ($rawScore === null || $rawLength === null) {
  // データが無ければメッセージ表示
  $resultBox.textContent = '結果データが見つかりませんでした。最初からプレイしてください。';
} else {
  const score = Number($rawScore); // 数値に変換
  const length = Number($rawLength);
  $resultBox.textContent = `あなたの正答数は ${score} / ${length} です。`;

  // 名前を尋ねてサーバへ送信（簡易実装：prompt を使用）
  (async function registerNameAndScore() {
    try {
      const userName = (prompt('名前を入力してください（省略可）') || '匿名').slice(0, 30);
      await sendScoreToServer(userName, score);
      await loadTopAndRender();
    } catch (err) {
      console.warn('register failed', err);
    }
  })();
}

// 再挑戦：app.html を開く（前回のスコアをクリア）
$restartBtn.addEventListener('click', () => {
  try {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizLength');
  } catch (err) {
    console.warn('localStorage clear failed', err);
  }
  window.location.href = './app.html';
});

// スタート画面へ戻る
$toStartpageBtn.addEventListener('click', () => {
  // 戻る際もスコアを消したい場合は以下を有効化
  // try { localStorage.removeItem('quizScore'); localStorage.removeItem('quizLength'); } catch (err) { console.warn(err); }
  window.location.href = './index.html';
});

// 送信処理: 名前とスコアを API に登録する
async function sendScoreToServer(userName, score) {
  const payload = { gameId: 'myQuiz', userName, score };
  try {
    await fetch(`${API_BASE}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('score submit failed', err);
  }
}

// ランキング取得と表示（簡易）
async function loadTopAndRender(limit = 10) {
  try {
    const res = await fetch(`${API_BASE}/top?gameId=myQuiz&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch top');
    const top = await res.json();
    renderLeaderboard(top);
  } catch (err) {
    console.warn('loadTop failed', err);
  }
}

function renderLeaderboard(items) {
  let $board = document.getElementById('leaderboard');
  if (!$board) {
    $board = document.createElement('div');
    $board.id = 'leaderboard';
    $resultBox.insertAdjacentElement('afterend', $board);
  }
  if (!Array.isArray(items) || items.length === 0) {
    $board.textContent = 'ランキングがまだありません。';
    return;
  }
  const rows = items.map((it, idx) => `${idx + 1}. ${it.userName || '匿名'} — ${it.score}`).join('\n');
  $board.textContent = 'トップ\n' + rows;
}