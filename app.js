//問題文、選択肢、正解オブジェクトの配列をインポート
import quiz from './quiz_data.js';

//後々while文で使う
const quizLength = quiz.length;
let quizIndex = 0;
//クイズの正解数
let score = 0;

//問題文をアラート表示させたいのでタグネームを探す　でも他にもdivタグはある
//console.log(document.getElementsByTagName('div')); 

//Idを探す　Id属性をHTMLタグに振ることができる。
//console.log(document.getElementById('js-question')); 

//このHTMLタグが持っているテキスト情報を取得
//console.log(document.getElementById('js-question').textContent); 

//定数の文字列をHTMLに反映させる

//ボタンオブジェクト取得を省略するため宣言,
//htmlのオブジェクトをとってくる変数定数の場合$を入れて見分けやすくする。
const $button = document.getElementsByTagName('button');  
//while文で使用するボタン配列の長さ
const buttonLength = $button.length; 

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
    console.log('現在の問題番号:', quizIndex);
  //アラートを書き換えて問題文を表示する。
  document.getElementById('js-question').textContent = quiz[quizIndex].question; 

//変更前　繰り返しが多いためリファクタリング
//一つ目のボタンに一つ目の回答を割り当てる。
// $button[0].textContent = answers[0];
// $button[1].textContent = answers[1];
// $button[2].textContent = answers[2];
// $button[3].textContent = answers[3];


//ボタンテキストを書き替え
  //while文を行うごとに加算する値　変数
  let buttonIndex = 0;
  while(buttonIndex < buttonLength){ //
    //ここに命令
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    //indexの値を1加算
    buttonIndex++;
  }
}
setupQuiz();//関数呼び出し

//ボタンをクリックしたら正誤判定する
//e.targetの内容を正誤判定する関数
const clickHandler = (e) => {
  //文字列の一致を判定するときは === を使う
  if(quiz[quizIndex].correct === e.target.textContent){
    //正解したらスコアを足してあげる。
    score++;
    //windowオブジェクトのアラート関数を呼び出し
  //   window.alert('正解！　現在の正解数' + score + '/' + quizLength);
  // }
  // else{
  //   window.alert('不正解！　現在の正解数' + score + '/' + quizLength);
  }

  quizIndex++;

  if(quizIndex < quizLength){
    //問題数がまだあればこちらを実行
    setupQuiz();
  }
  else{
    //問題数がもうなければこちらを実行
   try {
      localStorage.setItem('quizScore', String(score));       // ★ ローカルストレージに得点を保存
      localStorage.setItem('quizLength', String(quizLength)); // ★ ローカルストレージに問題数を保存
    } catch (err) {
      console.error('localStorage error:', err);             // ★ 保存失敗時はコンソールに出す
    }
    window.location.href = './result.html';     
  }
};

//button0~3までをクリックしたとき、イベントオブジェクトeを関数に渡す。
let handlerIndex = 0;
while(handlerIndex < buttonLength){
  
    $button[handlerIndex].addEventListener('click', (e) => {
    clickHandler(e);
  });

  handlerIndex++;
};

//イベントオブジェクトログ
// $button[0].addEventListener('click', (e) => {
//   console.log(e);
// });

// $button[0].addEventListener('click', () => {
//文字列の一致を判定するときは === を使う
//   if(correct === $button[0].textContent){
//windowオブジェクトのアラート関数を呼び出し
//     window.alert('正解！'); 
//   }
//   else{
//     window.alert('不正解！');
//   }
// });
// $button[1].addEventListener('click', () => {
//   if(correct === $button[1].textContent){
//     window.alert('正解！');
//   }
//   else{
//     window.alert('不正解！');
//   }
// });
// $button[2].addEventListener('click', () => {
//   if(correct === $button[2].textContent){
//     window.alert('正解！');
//   }
//   else{
//     window.alert('不正解！');
//   }
// });
// $button[3].addEventListener('click', () => {
//   if(correct === $button[3].textContent){
//     window.alert('正解！');
//   }
//   else{
//     window.alert('不正解！');
//   }
// });



//AIでのリファクタリング
// Array.from($button).forEach((btn) => {
//   btn.addEventListener('click', () => {
//     if (correct === btn.textContent) {
//       window.alert('正解！');
//     } else {
//       window.alert('不正解！');
//     }
//   });
// });