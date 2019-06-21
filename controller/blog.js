const xss = require('xss');
const {exec} = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select *from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  const listData = await exec(sql)
  return listData
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id ='${id}' `
  const detailData = await exec(sql)
  return detailData[0]
}

const newBlog = async (blogData = {}) => {

  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}' ,'${author}');
    `
  // console.error(sql)

  const newBlogData = await exec(sql)
  return {
    id: newBlogData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}';
    `
  const updateBlogData = await exec(sql)
  if(updateBlogData.affectedRows > 0){
    return true
  }
  return false
}

const delBlog = async (id,author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  const delData = await exec(sql)
  if(delData.affectedRows > 0){
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
