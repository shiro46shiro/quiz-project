// start.js: スタート画面のボタン操作（index.html へ遷移）を担当するファイル

// スタートボタン要素を取得する（id='start-btn'）
const $startBtn = document.getElementById('start-btn'); //ボタンを取得
const $userName = document.getElementById('userName');//ユーザーネーム入力欄を取得
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() +1;//月は0から始まるため+1
const day = now.getDate();

  //クリック時の処理を登録する
  $startBtn.addEventListener('click', () => {
    if($userName.value === ''){//ユーザーネームが空文字の場合
      window.alert('名前を入力してください');
    }
    else{
      localStorage.setItem("userName",$userName.value); //ユーザーネームを保存
      localStorage.setItem("year",year);
      localStorage.setItem("month",month);
      localStorage.setItem("day",day);
      window.location.href = './app.html'; // './app.html' は相対パス。必要なら絶対パスやURLに変更可
    }
    
  });