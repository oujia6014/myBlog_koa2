const {exec} = require('../db/mysql')

const login = async (username, password) => {
  // username = escape(username)
  // password = escape(password)
  const sql = `select username, realname from users where username='${username}' and password='${password}';`
  const loginData = await exec(sql)
  return loginData[0] || {}
}

module.exports = {
  login
}
