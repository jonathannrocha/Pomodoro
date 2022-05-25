const settings  = document.querySelector('.settings'),
      rowHeader = document.querySelector('.row-header'),
      infInterval = document.querySelector('.interval'),
      infBreak = document.querySelector('.break'),
      infTime = document.querySelector('.time span'),
      btStopStart = document.querySelector('.btn '),
      btNext = document.querySelector('.next'),
      timerAtualização = 1000,
      btRestart = document.querySelector('.restarttime'),
      btsettings = document.querySelector('.settings');
     
let timePomodoro = 25,
    timeBreak = 5,
    sec = 60,
    min = 0,
    timerInt = '',
    timeSelection = 'pomodoro',
    btstop = false,
    currenttime = true,
    rowPx,
    rowPixel = 0;

    let  screen = rowHeader.clientWidth

   
    
btStopStart.addEventListener('click', startPomodro);
infBreak.addEventListener('click', breakTime)
infBreak.addEventListener('click', breakTime)
infInterval.addEventListener('click',pomodoroStart )
btNext.addEventListener('click', nexttimer)
btRestart.addEventListener('click', restartclick)
btsettings.addEventListener('click', configpomo)

pomodoroStart()


function progressrow() {
  
    if( rowPixel > screen) {
        rowPixel = 0;
    } else {
       
        rowPx =  timeSelection == 'pomodoro' ? ( screen / ((timePomodoro - 1) * 60) ) : (screen/((timeBreak - 1) * 60) ); 
    }

    with(rowHeader.style) {
        backgroundColor = '#F2F2EB';
        width = `${rowPixel}px`;
        rowPixel +=  rowPx
    }

}

function restartprogressrow() {
    rowPixel = 0;
    with(rowHeader.style) {
        backgroundColor = 'rgba(255, 255, 255, 0.1)';
        width = `100%`;
    }
}

function timer() {
   
    if(currenttime) {
        min = timeSelection == 'pomodoro' ? timePomodoro - 1: timeBreak - 1; 
        progressrow()
    }
    currenttime = false;
    if(  sec ===  0 ) {
        if( min === 0 & sec === 0  )  {
            restartPomo()
            nexttimer()
        } else {
            sec = 60;   
            min--;
        }
    }else {
       sec--;  
    }   
}

function startPomodro() {  
    
    if(btstop) {
        clearInterval(timerInt);
        btStopStart.innerHTML = 'Start';
        btStopStart.classList.remove('active');
        btstop = false;
    } else {
        btstop = true;
        btStopStart.innerHTML = 'Stop';
        btStopStart.classList.add('active');
       
        timerInt = setInterval(() =>{
            timer()
            progressrow()
            textmin = min < 10? `0${min}` : min;
            textsec = sec < 10? `0${sec}` : sec;
            infTime.innerHTML = `${textmin}:${textsec}`;
        } ,timerAtualização);
    }   

    alertclick()
}

function breakTime () {
    timeSelection = 'break';
    infTime.innerHTML = text(timeBreak);
    restartPomo();
    alertclick()
    
}

function pomodoroStart () {
    timeSelection = 'pomodoro';
    infTime.innerHTML = text(timePomodoro);
    sec = 60;
    restartPomo();
    alertclick()
}

function restartclick() {
    timeSelection == 'pomodoro'? pomodoroStart():breakTime();
    alertclick()
}


function restartPomo() {
    currenttime = true;
    clearInterval(timerInt);
    btStopStart.innerHTML = 'Start';
    btStopStart.classList.remove('active');
    restartprogressrow();
}

function nexttimer() {
    btstop = false;
    if(timeSelection != 'pomodoro') {
        restartPomo()
        pomodoroStart()
        startPomodro()

    } else {
        restartPomo()
        breakTime()
        startPomodro()
    }
}

function text(value) {
    if(value < 10 ) {
        return `0${value}:00`
    } else {
        return `${value}:00`
    }
}


function alertclick() {
    const music = new Audio('../audio/click.mp3');
    music.currentTime  = 1;
    music.play();    
}


function configpomo() {

    btstop = true;
    startPomodro();

    window.addEventListener('keydown', (kpress)=>{
       
       if( kpress.key == 'Escape') {
            config.style.display = 'none' 
            pomo.style.display = 'block'
       }  

        let pomoValue =  inputPomo.value,
        breakValue = inputBreak.value;

    if( !( pomoValue == timePomodoro & breakValue == timeBreak )) {
        timePomodoro = pomoValue
        timeBreak = breakValue
        pomodoroStart();
       
    }      

    })  


    const pomo = document.querySelector('.pomo'),
    config = document.querySelector('.container-conf'),
    inputPomo = document.querySelector('#pomodorotimeinput'),
    inputBreak = document.querySelector('#breaktimeinput'),
    btclose = document.querySelector('.bt-close');
    pomo.style.display = 'none';
    config.style.display = 'block'
    inputPomo.value = timePomodoro;
    inputBreak.value = timeBreak;

    btclose.addEventListener('click', ()=>{
        
        
        alertclick()
      
        let pomoValue =  inputPomo.value,
            breakValue = inputBreak.value;

        if( !( pomoValue == timePomodoro & breakValue == timeBreak )) {
            timePomodoro = pomoValue
            timeBreak = breakValue
            pomodoroStart();
           
        }      
        
        pomo.style.display = 'block'
        config.style.display = 'none';
        
    })

    inputvalidator()
}

function inputvalidator() {
    const  inputvalidator = document.querySelectorAll('.validator')

    inputvalidator.forEach((e)=> {
        e.addEventListener('change', (a)=> {
            let value = a.target.value

            value = value < 1 ? a.target.value = 1 : a.target.value = value;
        })

    })
}

