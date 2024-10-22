console.log("Hellow World!!");
console.log("Version 1.01");
// 簡単なカウントダウンタイマーをTypeScriptで実装
function startTimer(duration: number) {
    let timer = duration;　//秒数
    const intervalId = setInterval(() => {　//無名関数
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      
      if (--timer < 0) {
        clearInterval(intervalId);
        console.log('タイマーが終了しました！');
      }
      }, 1000);　//無名関数ここまで
  }
  
  // 例えば5分のタイマーを開始する場合
  startTimer(5 * 60);
  