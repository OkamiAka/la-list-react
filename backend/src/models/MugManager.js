const AbstractManager = require("./AbstractManager");

class MugManager extends AbstractManager {
  constructor() {
    super({ table: "mug" });
  }

  insert(mug) {
    return this.database.query(
      `insert into ${this.table} (img, name,	com, 	marque_id, licence_id, 	user_id, 	view) values (?,?,?,?,?,?,?)`,
      [
        mug.img,
        mug.name,
        mug.com,
        mug.marque,
        mug.licence,
        mug.userId,
        mug.view,
      ]
    );
  }

  update(mug) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [mug.title, mug.id]
    );
  }

  view(id) {
    return this.database.query(
      `update ${this.table} set view="1" where id = ?`,
      [id]
    );
  }

  countmug(id) {
    return this.database.query(
      `select COUNT(*) as nb from  ${this.table} where id = ?`,
      [id]
    );
  }

  findlist(id, sub) {
    if (parseInt(id, 10) === parseInt(sub, 10)) {
      return this.database.query(
        `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', mug.id, "img",mug.img, 'name', mug.name, "com",mug.com, "marque", marque.name, "view",mug.view)) AS datas FROM mug JOIN licence ON licence.id=mug.licence_id LEFT JOIN marque ON marque.id=mug.marque_id WHERE mug.user_id="1" AND view=true GROUP BY mug.licence_id`,
        [id]
      );
    }
    return this.database.query(
      `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', mug.id, "img",mug.img, 'name', mug.name, "com",mug.com, "marque", marque.name, "view",mug.view)) AS datas FROM mug JOIN licence ON licence.id=mug.licence_id LEFT JOIN marque ON marque.id=mug.marque_id WHERE mug.user_id="1" GROUP BY mug.licence_id`,
      [id]
    );
  }
}

module.exports = MugManager;
