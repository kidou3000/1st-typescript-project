// HTML と TypeScript を連携して、ブラウザ上で動くシンプルなカウントダウンタイマー
// まず、HTML 側に以下のような要素を用意してね。
/*
<div>
  <input type="number" id="timeInput" placeholder="分を入力" min="1">
  <button id="startStopButton">スタート / ストップ</button>
  <button id="resetButton">リセット</button>
  <div id="timerDisplay">05:00</div>
  <div id="progressBarContainer">
    <div id="progressBar"></div>
  </div>
</div>

<style>
  #progressBarContainer {
    width: 100%;
    height: 20px;
    background-color: #f3f3f3;
    border: 1px solid #ccc;
    margin-top: 10px;
  }
  #progressBar {
    width: 100%;
    height: 100%;
    background-color: #4caf50;
  }
  
  #progressBar.blinking {
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    0% { background-color: #4caf50; }
    100% { background-color: #d4ffd4; }
  }

  #progressBar.warning {
    animation: warningBlink 1s infinite alternate;
  }

  @keyframes warningBlink {
    0% { background-color: #ff5252; }
    100% { background-color: #ffdada; }
  }
</style>

<script src="countdown_timer.js" defer></script>
*/

document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;
  const startStopButton = document.getElementById('startStopButton') as HTMLButtonElement;
  const resetButton = document.getElementById('resetButton') as HTMLButtonElement;
  const progressBar = document.getElementById('progressBar') as HTMLDivElement;
  const timeInput = document.getElementById('timeInput') as HTMLInputElement;

  let intervalId: number | null = null;
  let remainingTime = 300; // 初期設定5分（300秒）
  let initialTime = 300;
  let isRunning = false;
  const originalTitle = document.title;
  let blinkTitleIntervalId: number | null = null;

  // 初期表示を5分に設定
  timerDisplay.textContent = '5:00';

  function startTimer(duration: number) {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    let timer = duration;
    intervalId = window.setInterval(() => {
      timer--;
      remainingTime = timer;
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // ブラウザのタブのタイトルを更新
      document.title = `残り時間: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // プログレスバーの更新
      const progressPercentage = (timer / initialTime) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      // 残り20%以下の場合、警告色で点滅させる
      if (progressPercentage <= 20) {
        progressBar.classList.add('warning');
        progressBar.classList.remove('blinking');
      } else {
        progressBar.classList.remove('warning');
        if (isRunning) {
          progressBar.classList.add('blinking');
        } else {
          progressBar.classList.remove('blinking');
        }
      }

      if (timer < 0) {
        clearInterval(intervalId!);
        intervalId = null;
        timerDisplay.textContent = 'タイマーが終了しました！';
        progressBar.style.width = '0%';
        progressBar.classList.remove('blinking');
        progressBar.classList.remove('warning');
        isRunning = false;

        // タイマー終了時にタブのタイトルを点滅させる
        if (blinkTitleIntervalId === null) {
          let showOriginalTitle = true;
          blinkTitleIntervalId = window.setInterval(() => {
            document.title = showOriginalTitle ? 'タイマーが終了しました！' : '🔔 タイマー終了! 🔔';
            showOriginalTitle = !showOriginalTitle;
          }, 1000);
        }
      }
    }, 1000);
  }

  startStopButton.addEventListener('click', () => {
    if (!isRunning) {
      // タイマーの初期設定をユーザー入力から取得する
      const userInput = parseInt(timeInput.value, 10);
      if (!isNaN(userInput) && userInput > 0) {
        initialTime = userInput * 60;
        remainingTime = initialTime;
        timerDisplay.textContent = `${userInput}:00`;
      }
      // タイマーをスタートする
      startTimer(remainingTime);
      isRunning = true;
      progressBar.classList.add('blinking');
    } else {
      // タイマーをストップする
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      isRunning = false;
      progressBar.classList.remove('blinking');
      // タブのタイトルを元に戻す
      document.title = originalTitle;
      if (blinkTitleIntervalId !== null) {
        clearInterval(blinkTitleIntervalId);
        blinkTitleIntervalId = null;
        document.title = originalTitle;
      }
    }
  });

  resetButton.addEventListener('click', () => {
    // リセットボタンを押すとタイマーを初期設定に戻す
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    remainingTime = initialTime;
    const minutes = Math.floor(initialTime / 60);
    timerDisplay.textContent = `${minutes}:00`;
    progressBar.style.width = '100%';
    progressBar.classList.remove('blinking');
    progressBar.classList.remove('warning');
    isRunning = false;
    // タブのタイトルを元に戻す
    document.title = originalTitle;
    if (blinkTitleIntervalId !== null) {
      clearInterval(blinkTitleIntervalId);
      blinkTitleIntervalId = null;
      document.title = originalTitle;
    }
  });
});
