function ensureAuthenticated (req) {
  return req.isAuthenticated()
}

module.exports = {
  ensureAuthenticated
}
