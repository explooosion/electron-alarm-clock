const notifier = require('node-notifier')
const path = require('path')
const moment = require('moment')
const remote = require('electron').remote

const elNow = document.querySelector('.now-time')
const elAlarm = document.querySelector('.alarm-time')

// 如果使用者還是不同意授權執行 Notification
// 最好還是進行適當的處理以避免繼續打擾使用者

let time = moment()

/** Now Time */
elNow.innerText = moment(time).format('HH:mm:ss')

/** Default Alarm */
// const min = time.getMinutes() === 59 ? 0 : time.getMinutes() + 1
elAlarm.value = moment(time).add(5, 'seconds').format('HH:mm:ss')
timer()

/** Now Time */
function timer() {
    setTimeout(() => {
        time = moment()
        elNow.innerText = moment(time).format('HH:mm:ss')
        check()
        timer()
    }, 1000)
}

/** Check Time */
function check() {
    if (elNow.innerText === elAlarm.value) {
        notice('Wake Up!', elAlarm.value)
    }
}

/**
 * System Notification
 * @param {string} msg
 */
function notice(msg, alarm) {

    const window = remote.getCurrentWindow()
    window.restore()
    window.show()

    // https://github.com/mikaelbr/node-notifier
    notifier.notify({
        title: 'Alarm Clock',
        message: `It's ${alarm}. Wake Up!`,
        icon: path.join(__dirname, 'clock.ico'),
        sound: true,
    })

}