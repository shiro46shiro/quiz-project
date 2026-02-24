// result.js: localStorage からスコアを読み取り結果を表示する

const $resultBox = document.getElementById('result-box'); // 結果表示要素
const $restartBtn = document.getElementById('restart-btn'); // 再挑戦ボタン
const $toStartpageBtn = document.getElementById('to-startpage-btn'); // スタート画面へ戻るボタン

// localStorage からデータを取り出す
const $rawScore = localStorage.getItem('quizScore');
const $rawLength = localStorage.getItem('quizLength');
const $resultUserName = localStorage.getItem('userName');//　ユーザーネーム取得
const $year = localStorage.getItem('year');
const $month = localStorage.getItem('month');
const $day = localStorage.getItem('day');

let quizRanknig; //ランキング(json形式で保存する)

//ランキングデータ作成・更新
const updateRanking = (userName, score, year, month, day) => {
  //ローカルストレージからスコアを追加する既存のランキングデータを配列型に変換（なければ空配列）
  let ranking = JSON.parse(localStorage.getItem('quizRanking')) || [];
  //スコア追加
  ranking.push({userName:userName, score:score, year:year, month:month, day:day});
  //現在月でないものは削除
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() +1;
  ranking = ranking.filter(item => {return item.year == currentYear && item.month == currentMonth});

  //ソート スコアプロパティ降順
  ranking.sort((a,b) => b.score - a.score);
  //スコアが高く日付が新しいものを上位
  ranking.sort((a,b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // スコアが高い順
    }
    // スコアが同じ場合は日付が新しい順
    else if (a.day !== b.day) {
    return b.day - a.day; //日付が新しい順
    }
  });

  //上位10件までに絞る 開始位置0、要素数10
  ranking = ranking.slice(0,10);
  //ランキングデータをJson形式に変換して保存
  localStorage.setItem('quizRanking', JSON.stringify(ranking));
}
//関数呼び出し
updateRanking($resultUserName, Number($rawScore), Number($year), Number($month), Number($day));
console.log(localStorage.getItem('quizRanking'));//ランキングデータ確認用

//結果表示
if ($rawScore === null || $rawLength === null) {
  // データが無ければメッセージ表示
  $resultBox.textContent = '結果データが見つかりませんでした。最初からプレイしてください。';
} else {
  const score = Number($rawScore);//数値に変換
  const length = Number($rawLength);
  $resultBox.textContent = `${$resultUserName} さんの正答数は ${score} / ${length} です。`;
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
  try {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizLength');
  } catch (err) {
    console.warn('localStorage clear failed', err);
  }
  window.location.href = './index.html';
});