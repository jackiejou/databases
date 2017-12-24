CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  roomid INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(20),
  PRIMARY KEY (roomid)
);

CREATE TABLE users (
  userid INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20),
  PRIMARY KEY (userid)
);

CREATE TABLE messages (
  messageid INT NOT NULL AUTO_INCREMENT,
  userid INT NOT NULL,
  roomid INT NOT NULL,
  text VARCHAR(200),
  createdAt VARCHAR(30),
  PRIMARY KEY (messageid),
  FOREIGN KEY (roomid) REFERENCES rooms(roomid),
  FOREIGN KEY (userid) REFERENCES users(userid)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

