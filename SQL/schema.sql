CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  userId int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (userId)
);

CREATE TABLE messages (
  messageId int NOT NULL AUTO_INCREMENT,
  userId int,
  txt varchar(255),
  roomname varchar(255),
  PRIMARY KEY (messageId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE friends (
  friendsId int NOT NULL AUTO_INCREMENT,
  firstUserId int,
  secondUserId int,
  PRIMARY KEY (friendsId),
  FOREIGN KEY (firstUserId) REFERENCES users (userId),
  FOREIGN KEY (secondUserId) REFERENCES users (userId)
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




