// タイマー関数
// function countdown(seconds: number): void {
//     let remaining = seconds;
  
//     const intervalId = setInterval(() => {
//       console.log(remaining);
//       remaining--;
  
//       if (remaining < 0) {
//         clearInterval(intervalId);
//         console.log("Time's up!");
//       }
//     }, 1000); // 1秒ごとに実行
//   }
  
//   // 使い方
//   countdown(10); // 10秒のカウントダウン
  
function countdown(seconds:number):void{
  let remaining=seconds;

  const intervalId=setInterval(()=>{

    console.log(remaining);
    remaining--;
    if(remaining<0){
      clearInterval(intervalId);
      console.log("Time's up!");
    }
  },1000);

}

countdown(10);