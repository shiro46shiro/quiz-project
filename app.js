//定数で問題文、選択肢、答えを３問分宣言
const quiz = [
  {
    question: 'ドラゴンボール原作で二番目に強いとされるキャラクターは誰？',
    answers: [
      '魔人ブウ(孫悟飯吸収)',
      '魔人ブウ(ゴテンクス吸収)',
      '孫悟空(超サイヤ人3)',
      'ベジータ(魔人化)'],

    correct: '魔人ブウ(孫悟飯吸収)' //答え
  },
  {
    question: 'ドラゴンボールナメック星編でフリーザにとどめを刺したのは誰？',
    answers: [
      'ベジータ',
      '孫悟空',
      'トランクス',
      'クリリン'],

    correct: '孫悟空' 
  },  
  {
    question: 'ドラゴンボール原作で単体最強とされるキャラクターは誰？',
    answers: [
      '孫悟飯(アルティメット)',
      'ベジット',
      '孫悟空(超サイヤ人3)',
      'ベジータ(魔人化)'],

    correct: '孫悟飯(アルティメット)' 
  }
]

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
    //windowオブジェクトのアラート関数を呼び出し
    window.alert('正解！');
    //正解したらスコアを足してあげる。
    score++;
  }
  else{
    window.alert('不正解！');
  }

  quizIndex++;

  if(quizIndex < quizLength){
    //問題数がまだあればこちらを実行
    setupQuiz();
  }
  else{
    //問題数がもうなければこちらを実行
    window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！');
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