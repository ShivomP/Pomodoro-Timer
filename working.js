const timerMillis = document.querySelector(".timer__milliseconds")
const timerSeconds = document.querySelector(".timer__seconds")
const timerMinutes = document.querySelector(".timer__minutes")
const workingTime = document.querySelector(".working__time")

document.getElementById('timeInput').addEventListener('input', function() {
    let input = this.value;
    let regex = /^\d{2}:\d{2}:\d{3}$/;

    if (regex.test(input)) {
        this.style.borderColor = ''; 
        document.getElementById('error-message').style.display = 'none'; 
    } else {
        this.style.borderColor = 'red'; // Highlight border in red
        document.getElementById('error-message').style.display = 'block'; 
    }
});

let startTime
let cancelId
let countdown
let storedTime
let savedTime = 0

const startButton = document.querySelector(".stopwatch__start")
const stopButton = document.querySelector(".stopwatch__stop")
const resetButton = document.querySelector(".stopwatch__reset")

function setTime() {
    storedTime = workingTime.value.split(':')
    
    let minutes = Number(storedTime[0])
    let seconds = Number(storedTime[1])
    let millis = Number(storedTime[2])
    
    countdown = (((minutes * 60) + seconds) * 1000) + millis 
    console.log(countdown)

    timerMillis.innerHTML = storedTime[2]
    timerSeconds.innerHTML = storedTime[1]
    timerMinutes.innerHTML = storedTime[0]
}

function startTimer(){
    if (!storedTime) {
        alert('please enter a time')
        return
    }
    startButton.disabled = true
    stopButton.disabled = false
    resetButton.disabled = false
    startTime = Date.now()
    cancelId = requestAnimationFrame(updateTimer)
}

function stopTimer(){
    startButton.disabled = false
    stopButton.disabled = true
    resetButton.disabled = false
    savedTime += Date.now() - startTime
    cancelAnimationFrame(cancelId)
}

function resetTimer(){
    startTime = Date.now()
    savedTime = 0
    timerMillis.innerHTML = storedTime[2]
    timerSeconds.innerHTML = storedTime[1]
    timerMinutes.innerHTML = storedTime[0]
}

function updateTimer(){
    let millisElapsed = Date.now() - startTime + savedTime

    let millisLeft = countdown - millisElapsed
    if(millisLeft < 0){
        millisLeft = 0
        cancelAnimationFrame(cancelId)
        cancelId = null
    }
    let secondsLeft = millisLeft / 1000
    let minutesLeft = secondsLeft / 60

    let millisText = millisLeft % 1000
    let secondsText = Math.floor(secondsLeft % 60)
    let minutesText = Math.floor(minutesLeft)

    if(millisText.toString().length < 3){
        millisText = millisText.toString().padStart(3, "0")
    }
    if(secondsText.toString().length < 2){
        secondsText = secondsText.toString().padStart(2, "0")
    }
    if(minutesText.toString().length < 2){
        minutesText = minutesText.toString().padStart(2, "0")
    }

    timerMillis.innerHTML = millisText
    timerSeconds.innerHTML = secondsText
    timerMinutes.innerHTML = minutesText

    if(cancelId){
        cancelId = requestAnimationFrame(updateTimer)
    }
}