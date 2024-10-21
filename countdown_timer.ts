document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    const timeInput = document.getElementById('timeInput') as HTMLInputElement;
    const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;
  
    let intervalId: number | null = null;
  
    function updateDisplay(minutes: number, seconds: number) {
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    function startTimer(duration: number) {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      let timer = duration;
      updateDisplay(Math.floor(timer / 60), timer % 60);
      intervalId = window.setInterval(() => {
        timer--;
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        updateDisplay(minutes, seconds);
  
        if (timer < 0) {
          clearInterval(intervalId!);
          intervalId = null;
          timerDisplay.textContent = 'タイマーが終了しました！';
        }
      }, 1000);
    }
  
    startButton.addEventListener('click', () => {
      const duration = parseInt(timeInput.value, 10);
      if (!isNaN(duration) && duration > 0) {
        startTimer(duration);
      } else {
        alert('有効な秒数を入力してください');
      }
    });
  });
  