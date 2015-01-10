CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment,
  name VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment,
  name VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment,
  text VARCHAR(255),
  user_id int(11),
  room_id int(11),
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

