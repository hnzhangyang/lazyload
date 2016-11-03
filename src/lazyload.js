"use strict";
var Lazyload = function(elements,options){
	var that = this;
	var settings = {
		threshold      : 0 ,         // 临界值
		event          : 'scroll' ,  // 事件类型
		container      : window,     // 容器
		data_attribute : 'original', // 标记
		apper          : null ,      // 更新图片时的回调函数
		placeholder    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
 	}
	
	for(var item in options){
		settings[item] = options[item];
	}
	
	for(var i = 0 ; i < elements.length ; i++){
		var src = elements[i].getAttribute('src');
		if(!src || src == ''){
			elements[i].src = settings.placeholder;
		}
		that.update(settings,elements[i]);
	}
	
	settings.container.onscroll = function(){
		for(var i = 0 ; i < elements.length ; i++){
			that.update(settings,elements[i]);
		}
	}
}


Lazyload.prototype = {
	// 判断是否触发图片更新
	update : function(setting,element){
		if(this.abovethetop(setting,element) && this.abovetheleft(setting,element)){
			setting.apper && setting.apper(element);
			this.change(element);
		}
	},
	// 判断是否接近
	abovethetop : function(setting,element){
		var fold,
			containerHeight;
		if(element.getAttribute('src') != setting.placeholder){
			return false;
		}
		if(setting.container == undefined || setting.container == window){
			if (window.pageYOffset) {  
	        	fold = window.pageYOffset;
			}
	        else{
	        	fold = document.body.scrollTop; 
	        }	           
	        containerHeight = document.documentElement.clientHeight
		}else{
			fold = setting.container.scrollTop;
			containerHeight = setting.container.clientHeight
		}
		fold = fold ? fold : 0; 
		return fold + containerHeight + setting.threshold >= element.offsetTop;
	},
	abovetheleft : function(setting,element){
		var fold,
			containerWidth;
		if(element.getAttribute('src') != setting.placeholder){
			return false;
		}
		if(setting.container == undefined || setting.container == window){
			if (window.pageYOffset) {  
	        	fold = window.pageXOffset;
			}
			else {
	        	fold = document.body.scrollLeft; 
	        }	
	        containerWidth = document.documentElement.clientWidth
		}else{
			fold = setting.container.scrollLeft;
			containerWidth = setting.container.clientWidth
		}
		fold = fold ? fold : 0; 
		return fold + containerWidth + setting.threshold >= element.offsetLeft;
	},
	// 改变默认图片
	change : function(element){
		var originalSrc = element.getAttribute('data_attribute');
		if(originalSrc){
			element.src = originalSrc;
		};	
	}
}