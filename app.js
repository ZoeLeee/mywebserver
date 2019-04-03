var express = require('express');
var path = require('path');
const Cookies = require("cookies");
var indexRouter = require('./Routes/route');
const session=require('express-session');

var app = express();

const ALLOW_ORIGIN = [  // 域名白名单
  'http://localhost:8080',
  'http://www.dodream.online',
];

app.all('*',(req,res,next)=>{
  let reqOrigin = req.headers.origin;
  if(ALLOW_ORIGIN.includes(reqOrigin))
    res.header("Access-Control-Allow-Origin",reqOrigin);

  res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Credentials',true);
  next();
})

app.use(session({
  secret: "zoe",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 14*24*60*60*1000}
}));

//输出服务器记录
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', indexRouter);

app.listen(3000,()=>{
  console.log('listening on port 3000!');
})

