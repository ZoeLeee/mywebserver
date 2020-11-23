let express = require('express');
let path = require('path');
let indexRouter = require('./Routes/route');
const session = require('express-session');
const ReactSSR = require("react-dom/server");
const fs = require('fs');

var app = express();

const ALLOW_ORIGIN = [  // 域名白名单
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8081',
  'https://www.dodream.top',
  'http://www.dodream.top',
  'http://blog.dodream.wang',
  'http://api.dodream.wang:3000',
  'https://blog.dodream.wang',
  'https://admin.dodream.wang',
];

app.all('*', (req, res, next) => {
  let reqOrigin = req.headers.origin;
  if (ALLOW_ORIGIN.includes(reqOrigin))
    res.header("Access-Control-Allow-Origin", reqOrigin);
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(session({
  secret: "zoe",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }
}));
app.use("/static", express.static(path.join(__dirname, '../../static')));

//输出服务器记录
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

app.use("/", (req, res, next) => {
  console.log("-----------------------main-------------------------------------");
  const template = fs.readFileSync(path.join(__dirname, "../../static/index.html"), "utf8");
  const ServerEntiy = require("../../static/server-entry");
  const AppComponent = ServerEntiy.default;
  const store = ServerEntiy.appStore;
  store.isLogin = !!req.session.isLogin;
  const appString = ReactSSR.renderToString(AppComponent(store, {}, req.url));
  if (!appString) {
    res.status(404);
    res.sendFile(path.resolve(__dirname, "../../404.html"));
  }
  else
    res.send(template.replace("<slot/>", appString));
});

const PROT = 3000;

app.listen(PROT, () => {
  console.log(`listening on http://127.0.0.1:${PROT}!`);
});

