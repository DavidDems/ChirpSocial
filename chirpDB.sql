--hostname: team1chirpdb.mysql.database.azure.com
--port: 3306
--username: team1chirpdb
--password: U561MQ7kugctxPx
--resource group: rg-team1-mysql
--server name: team1chirpdb

CREATE DATABASE team1chirpdb;
USE team1chirpdb;


CREATE TABLE `users` (
userId INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
displayname VARCHAR(100) NOT NULL UNIQUE,
email VARCHAR(250) NOT NULL UNIQUE,
profilePicture MEDIUMBLOB NULL,
bio TEXT NULL,
dateOfBirth DATE NOT NULL,
dateJoined DATETIME DEFAULT CURRENT_TIMESTAMP,
followers INT DEFAULT 0,
following INT DEFAULT 0
);


CREATE TABLE `posts` (
postId INT PRIMARY KEY AUTO_INCREMENT,
publisherId INT NOT NULL,
replyId INT NULL,
originalReplyId INT NULL,
repostId INT NULL,
postHeader VARCHAR(255) NOT NULL,
postTxt TEXT NOT NULL,
postImg MEDIUMBLOB NULL,
postDate DATETIME DEFAULT CURRENT_TIMESTAMP,
likes INT DEFAULT 0
);


CREATE TABLE `followers` (
accountId INT NOT NULL,
followerId INT NOT NULL
);

ALTER TABLE posts
ADD CONSTRAINT fk_publisherid 
FOREIGN KEY (publisherId) REFERENCES users (userId);

ALTER TABLE posts
ADD CONSTRAINT fk_replyid 
FOREIGN KEY (replyId) REFERENCES posts (postId);

ALTER TABLE posts
ADD CONSTRAINT fk_originalReplyid 
FOREIGN KEY (originalReplyId) REFERENCES posts (postId);

ALTER TABLE posts
ADD CONSTRAINT fk_repostid 
FOREIGN KEY (repostId) REFERENCES posts (postId);

ALTER TABLE followers
ADD CONSTRAINT fk_accountid
FOREIGN KEY (accountId) REFERENCES users (userId);

ALTER TABLE followers
ADD CONSTRAINT fk_followerid 
FOREIGN KEY (followerId) REFERENCES users (userId);