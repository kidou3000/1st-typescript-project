document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement | null;
  const startStopButton = document.getElementById('startStopButton') as HTMLButtonElement | null;
  if (startStopButton) {
  startStopButton.style.whiteSpace = 'nowrap'; // ボタンのテキストが改行されないように設定
  startStopButton.style.width = '100%'; // ボタンの幅を大きく設定
  startStopButton.style.padding = window.innerWidth <= 600 ? '30px' : '20px'; // スマホでは高さを大きく、PCでは元の高さに // スマホでは高さをさらに大きく、他は20px
  startStopButton.style.fontSize = window.innerWidth <= 600 ? '1.6em' : '2em'; // スマホでのフォントサイズ調整
} 
  const resetButton = document.getElementById('resetButton') as HTMLButtonElement | null;
  if (resetButton) {
    resetButton.style.width = '100%'; // ボタンの幅を大きく設定
    resetButton.style.padding = window.innerWidth <= 600 ? '30px' : '20px'; // スマホでは高さを大きく、PCでは元の高さに // スマホでは高さをさらに大きく、他は30px
    resetButton.style.fontSize = window.innerWidth <= 600 ? '1.6em' : '2em'; // スマホでのフォントサイズ調整
  }
  const progressBar = document.getElementById('progressBar') as HTMLDivElement | null;
  const timeInput = document.getElementById('timeInput') as HTMLInputElement | null;

  if (!timerDisplay || !startStopButton || !resetButton || !progressBar || !timeInput) {
    console.error('必要な要素が見つかりません。HTML構造を確認してください。');
    return;
  }

  let intervalId: number | null = null;
  let remainingTime = 300; // 初期設定5分（300秒）
  let initialTime = 300;
  let isRunning = false;
  const originalTitle = document.title;
  let blinkTitleIntervalId: number | null = null;

  // 初期表示を5分に設定
timerDisplay.textContent = '5:00';
progressBar.style.width = '100%'; // プログレスバー初期化

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
progressBar.style.width = `${progressPercentage}%`; // プログレスバーの幅を更新

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
timerDisplay.style.fontSize = window.innerWidth <= 600 ? '1.2em' : '3em'; // スマホの時は文字サイズを小さくする
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

  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isRunning = false;
    progressBar.classList.remove('blinking');
    document.title = originalTitle;
    if (blinkTitleIntervalId !== null) {
      clearInterval(blinkTitleIntervalId);
      blinkTitleIntervalId = null;
    }
  }

  startStopButton.addEventListener('click', () => {
    if (!isRunning) {
      if (remainingTime <= 0) {
        // タイマーが終了していた場合、初期化
        remainingTime = initialTime;
        timerDisplay.textContent = `${Math.floor(initialTime / 60)}:00`;
        progressBar.style.width = '100%';
      }

      const userInput = parseInt(timeInput.value, 10);
      if (!isNaN(userInput) && userInput > 0) {
        initialTime = userInput * 60;
        remainingTime = initialTime;
        timerDisplay.textContent = `${userInput}:00`;
        progressBar.style.width = '100%'; // プログレスバーを再設定
      }
      // タイマーをスタートする
      startTimer(remainingTime);
      isRunning = true;
      progressBar.classList.add('blinking');

      // 終了時のタイトル点滅を止め、元に戻す
      if (blinkTitleIntervalId !== null) {
        clearInterval(blinkTitleIntervalId);
        blinkTitleIntervalId = null;
        document.title = originalTitle;
      }
    } else {
      // タイマーをストップする
      stopTimer();
    }
  });

  resetButton.addEventListener('click', () => {
    stopTimer();  // タイマーを停止
    remainingTime = initialTime;
    const minutes = Math.floor(initialTime / 60);
    timerDisplay.textContent = `${minutes}:00`;
    progressBar.style.width = '100%';
    progressBar.classList.remove('blinking');
    progressBar.classList.remove('warning');
  });
});
