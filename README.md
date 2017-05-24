# lazyload
图片懒加载插件

具备以下特性

 - 支持图片 change 前的回调事件
 - 支持设置图片加载时的临界值
 - 兼容性IE7+



## Examples

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
## 主要参数
```js
    /**
    *  @param {number} threshold     临界值，选填，默认 0 
    *  @param {string} event  事件类型，选填，默认 'scroll'
    *  @param {object} container  容器,选填，默认 window
    *  @param {string} 标记名称,选填，默认 'data-original'
    *  @param {function} apper 图片即将更换时的回调函数，选填，默认 null
    *  @param {string} placeholder 占位图片，选填，默认为一段图片的 base64值 
    **/
```
## Notes
 - 注意插件接受的参数都为原生 javaScript 对象
