const electron = require('electron')
const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')

const path = require('path')
const url = require('url')
const ChildProcess = require('child_process')

let win

if (handleSquirrelEvent()) {
    return;
}

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

    win.on('restore', () => {
        console.log('restore')
    })

    // Create Tray
    createTray()
}

function createTray() {
    let appIcon = null
    const iconPath = path.join(__dirname, 'clock.ico')

    const contextMenu = Menu.buildFromTemplate([{
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

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':

            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
}