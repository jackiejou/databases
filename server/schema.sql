CREATE DATABASE chat;

USE chat;


-- Currently getting "cannot add foreign key constraint error 1215"
CREATE TABLE messages (
  messageid INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(20),
  room INT NOT NULL,
  text VARCHAR(200),
  createdAt DATE,
  PRIMARY KEY (messageid),
  CONSTRAINT messageroom
  FOREIGN KEY fk_rm(room) REFERENCES rooms(roomid)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT messageuser
  FOREIGN KEY fk_usr(user) REFERENCES users(userid)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE rooms (
  roomid INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (roomid)
);

CREATE TABLE users (
  userid INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (userid)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

