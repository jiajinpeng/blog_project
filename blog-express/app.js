var createError = require('http-errors');//对错误页的处理
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');//对cookie的处理
var logger = require('morgan');//对日志处理
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// var indexRouter = require('./routes/index');//路由的引入
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();//初始化一个实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 处理日志
const ENV = process.env.NODE_ENV;
if(ENV != 'production'){
  // 开发环境 / 测试环境
  app.use(logger('dev'));
}else{
  // 线上环境
  const logFileName = path.join(__dirname,'logs','access.log');
  const writeStream = fs.createWriteStream(logFileName,{
    flags:'a'
  });
  app.use(logger('combined',{
    stream:writeStream
  }));
}


app.use(express.json());//如果有post数据的时候把数据放入到req.body中
app.use(express.urlencoded({ extended: false }));//如果有post数据的时候把数据放入到req.body中
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置Redis
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client:redisClient
});
// 
app.use(session({
  secret: 'RenYb@_',
  cookie: {
    path: '/',//默认配置
    httpOnly: true,//默认配置，不予许客户端更改session
    maxAge: 24 * 60 * 60 * 1000 //session过期时间
  },
  store:sessionStore
}));

// app.use('/', indexRouter);//路由的注册
// app.use('/users', usersRouter);//路由的注册
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
