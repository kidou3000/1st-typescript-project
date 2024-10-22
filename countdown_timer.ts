// HTML と TypeScript を連携して、ブラウザ上で動くシンプルなカウントダウンタイマー
// まず、HTML 側に以下のような要素を用意してね。
/*
<div>
  <button id="startButton">スタート</button>
  <div id="timerDisplay">05:00</div>
</div>

<script src="countdown_timer.js" defer></script>
*/

document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;
  const startButton = document.getElementById('startButton') as HTMLButtonElement;

  let intervalId: number | null = null;

  // 初期表示を5分に設定
  timerDisplay.textContent = '5:00';

  function startTimer(duration: number) {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    let timer = duration;
    intervalId = window.setInterval(() => {
      timer--;
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (timer < 0) {
        clearInterval(intervalId!);
        intervalId = null;
        timerDisplay.textContent = 'タイマーが終了しました！';
      }
    }, 1000);
  }

  startButton.addEventListener('click', () => {
    // ボタンを押すと5分（300秒）のカウントダウンがスタートする
    startTimer(300);
  });
});
