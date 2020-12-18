const electron = require('electron');
const { createMianWin } = require('./createWindow');
const path = require("path");

class App {
	constructor({app, BrowserWindow}){
		this.BrowserWindow = BrowserWindow;
		this.app = app;
		this.win = null;
		this.eventHandle(app);
	}
	createWindow(){
		this.win = createMianWin();
		let filePath = path.join(__dirname, './index.html');
		this.win.loadFile(filePath);
		// 等待渲染进程页面加载完毕再显示窗口
		this.win.once('ready-to-show', () => this.win.show())
	}
	eventHandle(app){
		app.on('closed', () => this.closed());
		app.on('ready', () => this.ready());
		app.on('window-all-closed', () => this.windowAllClosed());
		app.on('activate', () => this.activate());
	}
	activate(){
		if(!this.win) this.createWindow();
	}
	windowAllClosed(){
		if(process.platform !== 'darwin') this.app.quit();
	}
	ready(){
		this.createWindow(); 			// 创建主窗口
	}
	closed(){
		this.win = null;
	}
}

let app = new App(electron);