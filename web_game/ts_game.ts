// 超シンプルなコンソールゲームを作成していきます。
// 最初は1ファイルで始めて、段々と機能を追加していきましょう。

import * as readline from 'readline';

// Step 1: 数当てゲーム（シンプルなロジックを使ってみよう）

// ランダムな数字を生成する
const secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
const maxAttempts = 4;

// プレイヤーの推測を受け取る関数
function guessNumber(playerGuess: number) {
  attempts++;
  if (playerGuess === secretNumber) {
    console.log("やったね！正解だよ〜♪\nゲームクリア！おめでとう！");
    rl.close();
  } else if (attempts >= maxAttempts) {
    console.log(`残念だったね…正解は ${secretNumber} だったよ。またチャレンジしてね！\nゲームオーバー…`);
    rl.close();
  } else if (playerGuess > secretNumber) {
    console.log("うーん、もうちょっと小さい数字だよ〜。");
    promptGuess();
  } else {
    console.log("うーん、もうちょっと大きい数字かな〜。");
    promptGuess();
  }
}

// ユーザーからの入力を処理する
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptGuess() {
  rl.question(`数字を入力してください（残り${maxAttempts - attempts}回以内）: `, (answer: string) => {
    const playerGuess = parseInt(answer, 10);
    if (!isNaN(playerGuess)) {
      guessNumber(playerGuess);
    } else {
      console.log("あれれ？数字を入れてね〜。");
      promptGuess();
    }
  });
}

function startGame() {
  rl.question("ゲームを始めるには何かキーを押してください: ", () => {
    console.log("1から10までの数字を当ててみてね！奈緒ちゃんが応援してるよ♪");
    promptGuess();
  });
}

// ゲームタイトルを表示
console.log("");
console.log("=== 奈緒ちゃんの数当てゲーム ===\n");
startGame();
