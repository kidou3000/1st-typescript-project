function startTimer2(duration: number) {
    let timer=duration;
    const intervalId=setInterval(()=>{
        const minutes=Math.floor(timer/60);
        const seconds=timer%60;
        console.log(`${minutes}:${seconds}`);

        if(--timer<0){
            clearInterval(intervalId);
            console.log("timer is end");
        };
    },1000);
}


startTimer2(1*3);
