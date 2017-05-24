// 懒加载插件
// Lazyload 为一个构造函数，需要配合 new 关键字使用
// example
// new Lazyload(target,{
//      threshold : 0 ，                临界值，相差容器多少 px 位置开始触发图片更新 ，默认值 0 
//      event:'scroll',                 事件类型，默认 scroll	 
//      container:window,               容器，默认 window
//      data_attribute：data-original,  标记，真实的图片地址，默认 data-original
//      apper：null,                    即将触发更新时的回掉函数，默认 null
//      placeholder：''                 占位图片，默认 ''
// })


	var Lazyload = function (elements, options) {
		var that = this;
		this.settings = {
			threshold: 0,         // 临界值
			event: 'scroll',  // 事件类型
			container: window,     // 容器
			data_attribute: 'data-original', // 标记
			apper: null,      // 更新图片时的回调函数
			placeholder: ''
		}

		for (var item in options) {
			this.settings[item] = options[item];
		}

		for (var i = 0; i < elements.length; i++) {
			var src = elements[i].getAttribute('src');
			if (!src || src == '') {
				elements[i].src = this.settings.placeholder;
			}
			that.update(elements[i]);
		}

		this.settings.container.onscroll = function () {
			for (var i = 0; i < elements.length; i++) {
				that.update(elements[i]);
			}
		}
	}


	Lazyload.prototype = {

		// 判断是否触发图片更新
		update: function (element) {
			if (this.abovethetop(element) && this.abovetheleft(element)) {
				
				// 确保更新函数只执行一次 
				if (element.src !== element.getAttribute(this.settings.data_attribute)){
					this.settings.apper && this.settings.apper(element);
				}

				this.change(element);
			}
		},

		// 判断是否接近
		abovethetop: function (element) {
			var fold,
				containerHeight;
			if (element.getAttribute('src') != this.settings.placeholder && this.settings.placeholder !== '') {
				return false;
			}
			if (this.settings.container == undefined || this.settings.container == window) {
				if (window.pageYOffset) {
					fold = window.pageYOffset;
				}
				else {
					fold = document.body.scrollTop;
				}
				containerHeight = document.documentElement.clientHeight
			} else {
				fold = this.settings.container.scrollTop;
				containerHeight = this.settings.container.clientHeight
			}
			fold = fold ? fold : 0;
			return fold + containerHeight + this.settings.threshold >= element.offsetTop;
		},

		abovetheleft: function (element) {
			var fold,
				containerWidth;
			if (element.getAttribute('src') != this.settings.placeholder && this.settings.placeholder !== '') {
				return false;
			}
			if (this.settings.container == undefined || this.settings.container == window) {
				if (window.pageYOffset) {
					fold = window.pageXOffset;
				}
				else {
					fold = document.body.scrollLeft;
				}
				containerWidth = document.documentElement.clientWidth
			} else {
				fold = this.settings.container.scrollLeft;
				containerWidth = this.settings.container.clientWidth
			}
			fold = fold ? fold : 0;
			return fold + containerWidth + this.settings.threshold >= element.offsetLeft;
		},

		// 改变默认图片
		change: function (element) {
			var originalSrc = element.getAttribute(this.settings.data_attribute);
			if (originalSrc) {
				element.src = originalSrc;
			};
		}
	}
