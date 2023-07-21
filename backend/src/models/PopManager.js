const AbstractManager = require("./AbstractManager");

class PopManager extends AbstractManager {
  constructor() {
    super({ table: "pop" });
  }

  insert(pop) {
    return this.database.query(
      `insert into ${this.table} (img, name, number, 	marque_id, licence_id, 	user_id, 	view) values (?,?,?,?,?,?,?)`,
      [
        pop.img,
        pop.name,
        pop.num,
        pop.marque,
        pop.licence,
        pop.userId,
        pop.view,
      ]
    );
  }

  update(pop) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [pop.title, pop.id]
    );
  }

  view(id) {
    return this.database.query(
      `update ${this.table} set view="1" where id = ?`,
      [id]
    );
  }

  countpop(id) {
    return this.database.query(
      `select COUNT(*) as nb from  ${this.table} where id = ?`,
      [id]
    );
  }

  findlist(id, sub) {
    if (parseInt(id, 10) === parseInt(sub, 10)) {
      return this.database.query(
        `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', pop.id, "img",pop.img, 'name', pop.name, "num",pop.number, "marque", marque.name, "view",pop.view)) AS datas FROM pop JOIN licence ON licence.id=pop.licence_id LEFT JOIN marque ON marque.id=pop.marque_id WHERE pop.user_id=? AND view=true GROUP BY pop.licence_id`,
        [id]
      );
    }
    return this.database.query(
      `SELECT licence.id, licence.name AS licence_name, JSON_ARRAYAGG(JSON_OBJECT('id', pop.id, "img",pop.img, 'name', pop.name, "num",pop.number, "marque", marque.name, "view",pop.view)) AS datas FROM pop JOIN licence ON licence.id=pop.licence_id LEFT JOIN marque ON marque.id=pop.marque_id WHERE pop.user_id=? GROUP BY pop.licence_id`,
      [id]
    );
  }
}

module.exports = PopManager;
