const notifier = require('node-notifier')
const path = require('path')
const moment = require('moment')
const remote = require('electron').remote

const elNow = document.querySelector('.now-time')
const elAlarm = document.querySelector('.alarm-time')
elAlarm.addEventListener('change', onAlarmTextChange)

let time = moment()

let nowTime
let alarmTime

/** Set Time */
const now = moment(time).format('HH:mm:ss')
nowTime = now
elNow.innerText = now

const alarm = moment(time).add(5, 'seconds').format('HH:mm:ss')
alarmTime = alarm
elAlarm.value = alarm

timer()

/** Now Time */
function timer() {
    time = moment().format('HH:mm:ss')

    /** Set Now */
    nowTime = time
    elNow.innerText = time

    check()

    setTimeout(() => {
        timer()
    }, 1000)
}

/** Check Time */
function check() {
    const diff = moment(nowTime, 'HH:mm:ss').diff(moment(alarmTime, 'HH:mm:ss'))
    if (diff === 0) {
        notice(`It's ${alarmTime}. Wake Up!`)
    }
}

/**
 * System Notification
 * @param {string} msg
 */
function notice(msg) {
    /** Show Form */
    const window = remote.getCurrentWindow()
    window.restore()
    window.show()

    /** https://github.com/mikaelbr/node-notifier */
    notifier.notify({
        title: 'Alarm Clock',
        message: msg,
        icon: path.join(__dirname, 'clock.ico'),
        sound: true,
    })
}

/**
 * Save To Global Variable,
 * Can't Read Dom In Minimize Status.
 * @param {event} event
 */
function onAlarmTextChange(event) {
    alarmTime = event.target.value
}