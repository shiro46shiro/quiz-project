//定数で問題文、選択肢、答えを宣言
const question = 'ドラゴンボール原作で二番目に強いとされるキャラクターは誰？';
const answers =[
  '魔人ブウ(孫悟飯吸収)',
  '魔人ブウ(ゴテンクス吸収)',
  '孫悟空(超サイヤ人3)',
  'ベジータ(魔人化）']

const correct ='魔人ブウ(孫悟飯吸収)'; //答え

//console.log(document.getElementsByTagName('div')); //問題文をアラート表示させたいのでタグネームを探す　でも他にもdivタグはある
//console.log(document.getElementById('js-question')); //Idを探す　Id属性をHTMLタグに振ることができる。
//console.log(document.getElementById('js-question').textContent); //このHTMLタグが持っているテキスト情報を取得

//定数の文字列をHTMLに反映させる

//ボタンオブジェクト取得を省略するため宣言,
const $button = document.getElementsByTagName('button');  //htmlのオブジェクトをとってくる変数定数の場合$を入れて見分けやすくする。
const buttonLength = $button.length; //while文で使用するボタン配列の長さ

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
document.getElementById('js-question').textContent = question; //問題文をアラートの内容を書き換えて表示する。

//変更前　繰り返しが多いためリファクタリング
// $button[0].textContent = answers[0]; //一つ目のボタンに一つ目の回答を割り当てる。
// $button[1].textContent = answers[1];
// $button[2].textContent = answers[2];
// $button[3].textContent = answers[3];


//ボタンテキストを書き替え
  let buttonIndex = 0; //while文を行うごとに加算する値　変数
  while(buttonIndex < buttonLength){ //
    //ここに命令
    $button[buttonIndex].textContent = answers[buttonIndex];
    buttonIndex++; //indexの値を1加算
  }
}
setupQuiz();//関数呼び出し

//ボタンをクリックしたら正誤判定する
//e.targetの内容を正誤判定する関数
const clickHandler = (e) => {
  if(correct === e.target.textContent){ //文字列の一致を判定するときは === を使う
    window.alert('正解！'); //windowオブジェクトのアラート関数を呼び出し
  }
  else{
    window.alert('不正解！');
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

// $button[0].addEventListener('click', (e) => {
//   console.log(e);
// });イベントオブジェクトログ

// $button[0].addEventListener('click', () => {
//   if(correct === $button[0].textContent){ //文字列の一致を判定するときは === を使う
//     window.alert('正解！'); //windowオブジェクトのアラート関数を呼び出し
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