const db = require('./init-db');
// 引入上面的js文件，因为要使用init-db.js中的connection常量

function getUserDataByUserName(username) {
    db.connection.query('select * from jira_project where id like ?', [username], function (error, results) {
        //connnection.query('sql',[value],function(){})固定写法，sql语句中需要传参的地方用？，[]中输入要传入的参数值

        if (error) throw error;
        const content = JSON.parse(JSON.stringify(results))
        for (const index in content) {
            console.log(content[index].name);
        }

        //调用JSON.parse()将查询的结果转化为Json对象，这样就可以获取结果中任意字段的值，这里是获取查询结果中username字段的值
    });
}

function addResults(project_key, results) {
    db.connection.query("INSERT INTO me_test.jira_cypress_results \
    (project_id, totalTests, totalFailed, totalPassed, totalPending, totalSkipped, create_time, update_time) \
    VALUES((select id from jira_project t1 where t1.key = ?), ?, ?, ?, ?, ?, now(), null);", 
    [project_key, results.totalTests, results.totalFailed, results.totalPassed, results.totalPending, results.totalSkipped], function (error) {
        //往表里面增加数据

        if (error) {
            throw error
        }
    })
}

function updateUserAge(username, age) {
    db.connection.query(
        {
            sql: 'update user set age=? where username=?',
            timeout: 3000,
            values: [age, username]
            // query()的另外一种写法，用json字符串方式传入query()中需要的sql，value等信息，这里还可以指定执行sql的超时时间

        }, function (error, results) {
            if (error) {
                throw error
            }
            console.log('update ' + results.affectedRows + ' rows');
            //这里还可以获取此次sql执行，影响的行数

            console.log('changed ' + results.changedRows + ' rows');
            //获取此次sql执行，被修改的行数，changedRows与affectedRows的区别是，只有某行数据确实被修改，changedRow数据才会增加
        }
    )
}

function closeConnection() {
    db.connection.end();
    //关闭数据库连接
}

// getUserDataByUserName('%');
// addResults("GUC", 0,0,0,0,0);
// updateUserAge('lisi', 66);

module.exports = {
    addResults: addResults,
    closeConnection: closeConnection
};