const AbstractManager = require("./AbstractManager");

class MarqueManager extends AbstractManager {
  constructor() {
    super({ table: "marque" });
  }

  insert(marque) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      marque.title,
    ]);
  }

  update(marque) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [marque.title, marque.id]
    );
  }
}

module.exports = MarqueManager;
