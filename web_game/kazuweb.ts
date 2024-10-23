// ブラウザで実行するシンプルな数当てゲーム

let stage = 1;
let range = 10;
let secretNumber = Math.floor(Math.random() * range) + 1;
let attempts = 0;
const maxAttempts = 4;

// HTMLにメッセージを表示するための関数
function displayMessage(message) {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.innerText = message;
  }
}

// プレイヤーの推測を受け取る関数
function guessNumber() {
  const inputElement = document.getElementById('guessInput') as HTMLInputElement;
  if (inputElement) {
    const playerGuess = parseInt(inputElement.value, 10);
    if (!isNaN(playerGuess)) {
      attempts++;
      if (playerGuess === secretNumber) {
        displayMessage(`やったね！正解だよ〜♪\nゲームクリア！ステージ ${stage} クリア！`);
        stage++;
        range += 2;
        secretNumber = Math.floor(Math.random() * range) + 1;
        attempts = 0;
        displayMessage(`次はステージ ${stage} だよ！範囲は 1 から ${range} までになったよ。`);
      } else if (attempts >= maxAttempts) {
        displayMessage(`残念だったね…正解は ${secretNumber} だったよ。またチャレンジしてね！\nゲームオーバー…`);
      } else if (playerGuess > secretNumber) {
        displayMessage("うーん、もうちょっと小さい数字だよ〜。");
      } else {
        displayMessage("うーん、もうちょっと大きい数字かな〜。");
      }
    } else {
      displayMessage("あれれ？数字を入れてね〜。");
    }
  }
}

// ゲームを始めるための初期設定
function startGame() {
  displayMessage("1から10までの数字を当ててみてね！奈緒ちゃんが応援してるよ♪");
}

// HTMLのボタンにイベントリスナーを追加
document.getElementById('guessButton').addEventListener('click', () => {
  const inputElement = document.getElementById('guessInput') as HTMLInputElement;
  if (inputElement) {
    inputElement.select();
  }
  guessNumber();
});

// ゲームタイトルを表示してスタート
window.onload = () => {
  document.getElementById('title').innerText = "=== 奈緒ちゃんの数当てゲーム ===";
  startGame();
};

/* HTML部分の例
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>奈緒ちゃんの数当てゲーム</title>
</head>
<body>
    <h1 id="title"></h1>
    <p id="message"></p>
    <input type="number" id="guessInput" placeholder="数字を入力してね">
    <button id="guessButton">予想する！</button>
    <script src="game.js"></script>
</body>
</html>
*/
