const {exec} = require('../db/mysql')

const loginCheck = async (username, password) => {
  // username = escape(username)
  // password = escape(password)
  const sql = `select username, realname from users where username='${username}' and password='${password}';`
  const loginData = exec(sql)
  return rows[0] || {}
}

module.exports = {
  loginCheck
}
