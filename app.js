const express = require('express')
// 判別開發環境，這行放最前面才能運作
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const db = require('./models') // 引入資料庫

const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const app = express()

// 設定 view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 設定 session
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 86400000 }, // 延長到一天， 以免用到一半被登出
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

// 設定 passport，才能在底下環境變數使用
app.use(passport.initialize())
app.use(passport.session())

// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

require('./routes')(app, passport) // 把 passport 傳入 routes

module.exports = app
