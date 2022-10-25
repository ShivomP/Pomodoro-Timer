const timerMillis = document.querySelector(".timer__milliseconds")
const timerSeconds = document.querySelector(".timer__seconds")
const timerMinutes = document.querySelector(".timer__minutes")

let startTime
let cancelId
let savedTime = 0
const countdown = 65 * 1000

const startButtom = document.querySelector(".stopwatch__start")
const stopButtom = document.querySelector(".stopwatch__stop")
const resetButtom = document.querySelector(".stopwatch__reset")

function startTimer(){
    startButtom.disabled = true
    stopButtom.disabled = false
    resetButtom.disabled = false
    startTime = Date.now()
    cancelId = requestAnimationFrame(updateTimer)
}

function stopTimer(){
    startButtom.disabled = false
    stopButtom.disabled = true
    resetButtom.disabled = false
    savedTime += Date.now() - startTime
    cancelAnimationFrame(cancelId)
}

function resetTimer(){
    startTime = Date.now()
    savedTime = 0
    timerMillis.innerHTML = "000"
    timerSeconds.innerHTML = "05"
    timerMinutes.innerHTML = "01"
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