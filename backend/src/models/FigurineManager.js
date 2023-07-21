const AbstractManager = require("./AbstractManager");

class FigurineManager extends AbstractManager {
  constructor() {
    super({ table: "figurine" });
  }

  insert(figurine) {
    return this.database.query(
      `insert into ${this.table} (img, name,	com, 	marque_id, licence_id, 	user_id, 	view) values (?,?,?,?,?,?,?)`,
      [
        figurine.img,
        figurine.name,
        figurine.com,
        figurine.marque,
        figurine.licence,
        figurine.userId,
        figurine.view,
      ]
    );
  }

  update(figurine) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [figurine.title, figurine.id]
    );
  }

  view(id) {
    return this.database.query(
      `update ${this.table} set view="1" where id = ?`,
      [id]
    );
  }

  countFigurine(id) {
    return this.database.query(
      `select COUNT(*) as nb from  ${this.table} where id = ?`,
      [id]
    );
  }

  findlist(id, sub) {
    if (parseInt(id, 10) === parseInt(sub, 10)) {
      return this.database.query(
        `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', figurine.id, "img",figurine.img, 'name', figurine.name, "com",figurine.com, "marque", marque.name, "view",figurine.view)) AS datas FROM figurine JOIN licence ON licence.id=figurine.licence_id LEFT JOIN marque ON marque.id=figurine.marque_id WHERE figurine.user_id=? AND view=true GROUP BY figurine.licence_id`,
        [id]
      );
    }
    return this.database.query(
      `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', figurine.id, "img",figurine.img, 'name', figurine.name, "com",figurine.com, "marque", marque.name, "view",figurine.view)) AS datas FROM figurine JOIN licence ON licence.id=figurine.licence_id LEFT JOIN marque ON marque.id=figurine.marque_id WHERE figurine.user_id=? GROUP BY figurine.licence_id`,
      [id]
    );
  }
}

module.exports = FigurineManager;
