// 超シンプルなコンソールゲームを作成していきます。
// 最初は1ファイルで始めて、段々と機能を追加していきましょう。

// Step 1: 数当てゲーム（シンプルなロジックを使ってみよう）

// ランダムな数字を生成する
const secretNumber = Math.floor(Math.random() * 10) + 1;

// プレイヤーの推測を受け取る関数
function guessNumber(playerGuess: number) {
  if (playerGuess === secretNumber) {
    console.log("おめでとう！正解です！");
  } else if (playerGuess > secretNumber) {
    console.log("残念！もっと小さい数字です。");
  } else {
    console.log("残念！もっと大きい数字です。");
  }
}

// ゲームを実行
console.log("1から10までの数字を当ててみてください。");
guessNumber(4); // 例えば5を推測として与える
