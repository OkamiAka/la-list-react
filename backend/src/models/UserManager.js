const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (	username, lastname, firstname, password) values (?,?,?,?)`,
      [user.username, user.lastname, user.firstname, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  findUserByUsername(username) {
    return this.database.query(
      `select * from  ${this.table} where username = ?`,
      [username]
    );
  }

  allliste() {
    return this.database.query(
      `SELECT user.*,
      (SELECT COUNT(*) FROM figurine WHERE user_id=user.id ) as nb_figurine,
      (SELECT COUNT(*) FROM pop WHERE user_id=user.id) as nb_pop,
      (SELECT COUNT(*) FROM mug WHERE user_id=user.id) as nb_mug
      FROM user`
    );
  }
}

module.exports = UserManager;
