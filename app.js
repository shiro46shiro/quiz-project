
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