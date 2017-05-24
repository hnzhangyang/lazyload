# lazyload
图片懒加载插件

具备以下特性

 - 支持图片 change 前的回调事件
 - 支持设置图片加载时的临界值
 - 兼容性IE7+

## 目录
- [usage](#usage)
- [param](#param)
  - [threshold](#threshold)
  - [event](#event)
  - [container](#container)
  - [data_attribute](#data_attribute)
  - [apper](#apper)
  - [placeholder](#placeholder)

- [Notes](#Notes)
## usage
```html
  <script>
  // 获取目标对象
  var imgArr = document.getElementsByTagName('img');
	var box = document.getElementById('box');
  // 实例化插件
    new Lazyload(imgArr,{
      container:box,
      apper:function(){
        // some code
      }
    })
  </script>
```
## param
### threshold
临界值，选填，默认 0
### event
事件类型，选填，默认 'scroll'
### container
容器,选填，默认 window
### data_attribute
标记名称,选填，默认 'data-original'
### apper
图片即将更换时的回调函数，选填，默认 null
### placeholder
占位图片，选填，默认为一段图片的 base64值 

## Notes
 - 注意插件接受的参数都为原生 javaScript 对象
