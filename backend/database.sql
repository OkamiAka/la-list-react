create table user (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE,
  img VARCHAR(80) NULL,
  lastname VARCHAR(80) NOT NULL,
  firstname VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into user (username, password, lastname, firstname, img) VALUES
("okami", "$argon2id$v=19$m=65536,t=5,p=1$LiOUxKuxGlqllBS/orpihg$ztzttCi1WClTHAGgKSZF9xYa579t7gf2P3aqHP1NJZ0","okami","aka",null),
("test", "$argon2id$v=19$m=65536,t=5,p=1$LiOUxKuxGlqllBS/orpihg$ztzttCi1WClTHAGgKSZF9xYa579t7gf2P3aqHP1NJZ0","TEST","user","https://cdn-icons-png.flaticon.com/512/3135/3135715.png"),
("wolfy", "$argon2id$v=19$m=65536,t=5,p=1$LiOUxKuxGlqllBS/orpihg$ztzttCi1WClTHAGgKSZF9xYa579t7gf2P3aqHP1NJZ0","WOLF","red",null);

create table licence (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL
  );

INSERT INTO licence (name) VALUES ("licence name 1"),("licence name 2");

create table marque (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL
  );

INSERT INTO marque (name) VALUES ("marque name 1"),("marque name 2");

create table figurine (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  img VARCHAR(80) NULL,
  name VARCHAR(80) NULL,
  com VARCHAR(80) NULL,
  marque_id int(11) unsigned NULL,
  licence_id int(11) unsigned NOT NULL,
  user_id int(11) unsigned NOT NULL,
  view BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT `fk_figurine_user` FOREIGN KEY (user_id) REFERENCES `user`(id),
  CONSTRAINT `fk_figurine_licence` FOREIGN KEY (licence_id) REFERENCES `licence`(id)
);

INSERT INTO figurine (img, name, com, marque_id, licence_id, user_id) VALUES ("https://boutiquepokemon.com/136-large_default/figurine-carapuce.jpg", 'figurine name 1', 'figurine com 1', 1, 1, 1),(NULL, 'figurine name 2', 'figurine com 2', 2, 2, 1),(NULL, 'figurine name 3', 'figurine com 3', 2, 1, 1);

create table pop (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  img VARCHAR(80) NULL,
  name VARCHAR(80) NULL,
  number int(11) unsigned NOT NULL,
  marque_id int(11) unsigned NULL,
  licence_id int(11) unsigned NOT NULL,
  user_id int(11) unsigned NOT NULL,
  view BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT `fk_pop_user` FOREIGN KEY (user_id) REFERENCES `user`(id)
);

INSERT INTO pop (name,number,user_id,licence_id,marque_id) VALUES ("pop name 1",2,1,1,1),("pop name 2",1,1,1,1);

create table mug (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  img VARCHAR(80) NULL,
  name VARCHAR(80) NULL,
  com VARCHAR(80) NULL,
  marque_id int(11) unsigned NULL,
  licence_id int(11) unsigned NOT NULL,
  user_id int(11) unsigned NOT NULL,
  view BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT `fk_mug_user` FOREIGN KEY (user_id) REFERENCES `user`(id)
);

INSERT INTO mug (img, name, com, marque_id, licence_id, user_id) VALUES (NULL, 'mug name 1', 'azekqbfkzebs', NULL, 1, 1),(NULL, 'mug name 2', 'azekqbfkzebs', NULL, 1, 1),(NULL, 'mug name 3', 'azekqbfkzebs', NULL, 1, 1);