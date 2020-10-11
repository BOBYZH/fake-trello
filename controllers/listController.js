const db = require('../models')

const User = db.User
const List = db.List

const listController = {
  getLists: (req, res) => {
    return List.findAll({where: {userId: req.user.id}}).then(lists => {
      return res.render('index', JSON.parse(JSON.stringify({lists
      })))
    })
  }
}
module.exports = listController
