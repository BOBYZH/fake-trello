const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

const userController = {
  // 防止亂打網址出現404錯誤
  redirectInvalidUrl: (req, res) => {
    res.redirect('/')
  },

  signInPage: (req, res) => {
    return res.render('signIn')
  },

  signIn: (req, res) => {
    // req.flash('success_messages', '成功登入！')
    res.redirect('/')
  },

  signUpPage: (req, res) => {
    return res.render('signUp')
  },

  signUp: (req, res) => {
    if (req.body.password !== req.body.passwordCheck) {
      req.flash('error_messages', '密碼輸入不相同')
      return res.redirect('back')
    }
    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        req.flash('error_messages', '信箱已註冊帳號')
        return res.redirect('back')
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        }).then(user => {
          req.flash('success_messages', '成功註冊')
          return res.redirect('/signin')
        })
      }
    })
  },

  logOut: (req, res) => {
    req.logout()
    // 購物車已經有商品時跳出互動視窗，方便結帳時切換帳號時登入
    if (res.locals.cart.CartItems.length === 0) { // 購物車沒商品時
      res.redirect('/')
    } else {
      res.redirect('/signin')
    }
  },

  getIndex: (req, res) => {
    return res.render('index', JSON.parse(JSON.stringify({
    })))
  }
}

module.exports = userController
