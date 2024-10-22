// 超シンプルなコンソールゲームを作成していきます。
// 最初は1ファイルで始めて、段々と機能を追加していきましょう。

import * as readline from 'readline';

// Step 1: 数当てゲーム（シンプルなロジックを使ってみよう）

// ランダムな数字を生成する
const secretNumber = Math.floor(Math.random() * 10) + 1;

// プレイヤーの推測を受け取る関数
function guessNumber(playerGuess: number) {
  if (playerGuess === secretNumber) {
    console.log("おめでとう！正解です！");
    rl.close();
  } else if (playerGuess > secretNumber) {
    console.log("残念！もっと小さい数字です。");
    promptGuess();
  } else {
    console.log("残念！もっと大きい数字です。");
    promptGuess();
  }
}

// ユーザーからの入力を処理する
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptGuess() {
  rl.question('数字を入力してください: ', (answer: string) => {
    const playerGuess = parseInt(answer, 10);
    if (!isNaN(playerGuess)) {
      guessNumber(playerGuess);
    } else {
      console.log('有効な数字を入力してください。');
      promptGuess();
    }
  });
}

// ゲームを実行
console.log("1から10までの数字を当ててみてください。");
promptGuess();
