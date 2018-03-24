const electron = require('electron')
const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')

const path = require('path')
const url = require('url')

let win

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 400,
        height: 400,
        maximizable: false
    })

    win.setAlwaysOnTop(true)

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open DevTools.
    // win.webContents.openDevTools()

    // When Window Close.
    win.on('closed', () => {
        win = null
    })

    // When Window Minimize
    win.on('minimize', () => {
        win.hide()
    })

    // Create Tray
    createTray()
}

function createTray() {
    let appIcon = null
    const iconPath = path.join(__dirname, 'clock.ico')

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'AlarmClock',
            click() {
                win.show()
            }
        },
        {
            label: 'Quit',
            click() {
                win.removeAllListeners('close')
                win.close()
            }
        }
    ]);

    appIcon = new Tray(iconPath)
    appIcon.setToolTip('Alarm Clock')
    appIcon.setContextMenu(contextMenu)

}