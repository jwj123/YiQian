
'use strict';
var role = {
    roleId : "",    //角色编号
    roleName : "",  //角色名
    queryByUserId: "SELECT t1.* FROM role t1, usergroup t2 WHERE t1.roleId = t2.roleId ",
    insertByUserId: "INSERT INTO usergroup (roleId, userId) VALUES ",
    deleteByUserId: "DELETE FROM usergroup WHERE userId = ",
    query: "SELECT * FROM role WHERE 1=1 ",
    insert: "INSERT INTO role SET ",
    update: "UPDATE role SET ",
    delete: "DELETE FROM role WHERE roleId in ",
    pk: "roleId"
}

module.exports = role;