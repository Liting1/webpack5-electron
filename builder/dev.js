const webpack = require('webpack');
const mainConfig = require('./webpack.config.js');

function mainDev(){
	
	webpack(mainConfig, err => {
		if(err){
			console.log('打包主进程遇到Error！');
		} else {
			console.log("打包主进程成功");
		}
	})
}

mainDev();