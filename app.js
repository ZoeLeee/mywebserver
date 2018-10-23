var express = require('express');
var path = require('path');

var indexRouter = require('./Routes/route');

var app = express();
app.all('*',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Credentials',true);
  next();
})


//输出服务器记录
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3000,()=>{
  console.log('listening on port 3000!');
})

