server开发和前端开发的区别

服务稳定性
    1.server端可能会遭受各种恶意攻击和误操作
    2.当个客户端可以意外挂掉，但是服务的不能
    3.课程后面会讲解使用PM2做进程守候
考虑内存和CPU（优化，扩展）
    1.客户端独占一个浏览器，内存和cup都不是问题
    2.sever端要承载很多请求，cup和内存都是稀缺资源
    3.课程会吗会讲解使用stream写日志，使用Redis存session
日志记录
    1.前端也会参与写日志，但只是日志的发起方，不关心后续
    2.server端要记录日志、存储日志、分析日志、前端不关心
    3.课程后面会讲解多种日志记录方式，以及如何分析日志
安全
    server端要随时准备接受各种恶意攻击，前端则少很多
    如：越权操作，数据库攻击等
    课程后面会讲解登录验证，预防xss攻击和sql注入
集群和服务拆分
    1.产品发展速度快，流量可能会迅速增加
    2.如何通过扩展机器和服务拆分来承载大流量
    3.本课程虽然是单机器开发，但是从设计上支持服务拆分