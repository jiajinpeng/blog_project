nodejs 和 JavaScript的区别

ECMAScript
    1.定义了语法，写JavaScript和nodejs都必须遵守
    2.变量的定义，循环，判断，函数
    3.原型和原型链、作用域和闭包、异步
        不能操作DOM，不能监听click事件，不能发送ajax请求
        不能处理http请求，不能操作文件
        既，只有ECMAScript,几乎做不了任何实际的项目
JavaScript
    1.使用ECMAScript语法规范，外加web api,缺一不可
    2.DOM操作，BOM操作，事件绑定，Ajax等
    3.两者结合，即可完成浏览器端的任何操作
nodejs
    1.使用ECMAScript语法规范，外加node.jsAPI，缺一不可
    2.处理http，处理文件等 参考文章：nodejs.cn/api/
    3.两者结合，即可完成server端的任何操作
   
总结
    ECMAScript是语法规范
    nodejs = ECMAScript + nodejs API

    commonjs模块化
    nodejs debugger