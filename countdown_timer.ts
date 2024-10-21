// HTML と TypeScript を連携して、ブラウザ上で動くシンプルなカウントダウンタイマー
// まず、HTML 側に以下のような要素を用意してね。
/*
<div>
  <div id="timerDisplay">00:00</div>
</div>

<script src="countdown_timer.js" defer></script>
*/

document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;

  let intervalId: number | null = null;

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

  // 固定のカウントダウン時間（例えば5分 = 300秒）
  startTimer(300);
});
