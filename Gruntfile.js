var grunt = require('grunt');

grunt.config.init({
    pkg: grunt.file.readJSON('./AlarmClock/package.json'),
    'create-windows-installer': {
        ia32: {
            appDirectory: './AlarmClock/AlarmClock-win32-x64',
            outputDirectory: './AlarmClock/installer64',
            authors: 'Robby',
            title: 'AlarmClock',
            exe: 'AlarmClock.exe',
            description: 'alarm clock',
            noMsi: true,
            loadingGif: 'clock.ico',
            setupIcon: 'clock.ico',
            icon: 'clock.ico',
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);