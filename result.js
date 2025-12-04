// result.js: localStorage からスコアを読み取り結果を表示する

const resultBox = document.getElementById('result-box'); // 結果表示要素
const restartBtn = document.getElementById('restart-btn'); // 再挑戦ボタン
const toStartpageBtn = document.getElementById('to-startpage-btn'); // スタート画面へ戻るボタン

// localStorage からデータを取り出す
const rawScore = localStorage.getItem('quizScore');
const rawLength = localStorage.getItem('quizLength');

if (rawScore === null || rawLength === null) {
  // データが無ければメッセージ表示
  resultBox.textContent = '結果データが見つかりませんでした。最初からプレイしてください。';
} else {
  const score = Number(rawScore);
  const length = Number(rawLength);
  resultBox.textContent = `あなたの正答数は ${score} / ${length} です。`;
}

// 再挑戦：app.html を開く（前回のスコアをクリア）
restartBtn.addEventListener('click', () => {
  try {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizLength');
  } catch (err) {
    console.warn('localStorage clear failed', err);
  }
  window.location.href = './app.html';
});

// スタート画面へ戻る
toStartpageBtn.addEventListener('click', () => {
  window.location.href = './index.html';
});