// HTML と TypeScript を連携して、ブラウザ上で動くシンプルなカウントダウンタイマー
// まず、HTML 側に以下のような要素を用意してね。
/*
<div>
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
</style>

<script src="countdown_timer.js" defer></script>
*/

document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;
  const startStopButton = document.getElementById('startStopButton') as HTMLButtonElement;
  const resetButton = document.getElementById('resetButton') as HTMLButtonElement;
  const progressBar = document.getElementById('progressBar') as HTMLDivElement;

  let intervalId: number | null = null;
  let remainingTime = 300; // 初期設定5分（300秒）
  const initialTime = 300;
  let isRunning = false;

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

      // プログレスバーの更新
      const progressPercentage = (timer / initialTime) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      if (timer < 0) {
        clearInterval(intervalId!);
        intervalId = null;
        timerDisplay.textContent = 'タイマーが終了しました！';
        progressBar.style.width = '0%';
        isRunning = false;
      }
    }, 1000);
  }

  startStopButton.addEventListener('click', () => {
    if (!isRunning) {
      // タイマーをスタートする
      startTimer(remainingTime);
      isRunning = true;
    } else {
      // タイマーをストップする
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      isRunning = false;
    }
  });

  resetButton.addEventListener('click', () => {
    // リセットボタンを押すとタイマーを5:00に戻す
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    remainingTime = initialTime;
    timerDisplay.textContent = '5:00';
    progressBar.style.width = '100%';
    isRunning = false;
  });
});
