const notifier = require('node-notifier')
const path = require('path')

const remote = require('electron').remote

const elNow = document.querySelector('.now-time')
const elAlarm = document.querySelector('.alarm-time')

let time = new Date()

/** Now Time */
elNow.innerText = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

/** Default Alarm */
const min = time.getMinutes() === 59 ? 0 : time.getMinutes() + 1
elAlarm.value = `${time.getHours()}:${min}:0`

timer()

/** Now Time */
function timer() {
    setTimeout(() => {
        time = new Date()
        elNow.innerText = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        check()
        timer()
    }, 1000)
}

/** Check Time */
function check() {
    if (elNow.innerText === elAlarm.value) {
        notification('Wake Up!', elAlarm.value)
    }
}

/**
 * System Notification
 * @param {string} msg
 */
function notification(msg, alarm) {

    // https://github.com/mikaelbr/node-notifier
    notifier.notify({
        title: 'Alarm Clock',
        message: `It's ${alarm}. Wake Up!`,
        icon: path.join(__dirname, 'clock.ico'),
        sound: true,
    });

    const window = remote.getCurrentWindow()
    window.show()
}