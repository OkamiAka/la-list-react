const AbstractManager = require("./AbstractManager");

class LicenceManager extends AbstractManager {
  constructor() {
    super({ table: "licence" });
  }

  insert(licence) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      licence.title,
    ]);
  }

  update(licence) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [licence.title, licence.id]
    );
  }
}

module.exports = LicenceManager;
