const userController = require('../controllers/userController')
const listController = require('../controllers/listController')

const helpers = require('../helpers')

module.exports = (app, passport) => {
  const unAuthenticated = (req, res, next) => {
    if (!helpers.ensureAuthenticated(req)) {
      return next()
    }
    res.redirect('/')
  }

  const authenticated = (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      return next()
    }
    res.redirect('/signin')
  }

  // 首頁
  app.get('/', authenticated, listController.getLists)

  // 登入頁面
  app.get('/signin', unAuthenticated, userController.signInPage)
  // 登入
  app.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signIn)
  // 註冊頁面
  app.get('/signup', userController.signUpPage)
  // 註冊
  app.post('/signup', userController.signUp)
  // 登出
  app.get('/logout', userController.logOut)

  // 避免404當掉
  app.all('*', userController.redirectInvalidUrl)
}
