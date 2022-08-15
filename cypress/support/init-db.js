const mysql = require('mysql');
//安装mysql包后，引入mysql，供后面使用
 
// const connection = mysql.createConnection({
//     host: "10.11.14.80",
//     user: "admin",
//     password: "123456",
//     database: "me_test"
// });
const connection = mysql.createConnection({
    host: "10.88.29.19",
    user: "admin",
    password: "123456",
    database: "me_test"
});
//固定写法，这里用户名和密码请填写你本机安装mysql时设置的用户名和密码
 
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
//创建数据库连接，调试时可以调用该方法先保证connection能正常创建
 
module.exports = {
    connection: connection
};
