const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready',function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('closed',function(){
        app.quit();
    });

    //Build menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTmeplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    addWindow.on('close', function(){
        addWindow = null;
    })

}

const mainMenuTmeplate =[
    {
        label:'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label:'Quit',
                accelarator: process.platform == 'darwin' ? 'Alt+Q' : 
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }

        ]
    }
];