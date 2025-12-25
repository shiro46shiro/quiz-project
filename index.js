// start.js: スタート画面のボタン操作（index.html へ遷移）を担当するファイル

// スタートボタン要素を取得する（id='start-btn'）
const $startBtn = document.getElementById('start-btn'); //ボタンを取得

  //クリック時の処理を登録する
  $startBtn.addEventListener('click', () => {
    // クリック時に app.html に遷移する（同一フォルダ内の app.html を開く）
    window.location.href = './app.html'; // './app.html' は相対パス。必要なら絶対パスやURLに変更可
  });