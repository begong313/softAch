drop schema if exists softArch;
create schema softArch;
use  softArch;
drop table if exists `account`;
CREATE TABLE `account` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `public_key` varchar(255) NOT NULL
);
drop table if exists `friendship`;
CREATE TABLE `friendship` (
  `user_id` int,
  `user_id2` int,
  PRIMARY KEY (`user_id`, `user_id2`)
);
drop table if exists `profile`;
CREATE TABLE `profile` (
  `user_id` int PRIMARY KEY,
  `nickname` varchar(255),
  `profile_pic` varchar(255)
);
drop table if exists `singleChatroom`;
CREATE TABLE `singleChatroom` (
  `chatroom_id` varchar(255) PRIMARY KEY,
  `owner_id` int,
  `attender_id` int,
  `secret_key` varchar(255) NOT NULL
);
drop table if exists `groupChatroom`;
CREATE TABLE `groupChatroom` (
  `chatroom_id` varchar(255) PRIMARY KEY
);
drop table if exists `groupChatAttender`;
CREATE TABLE `groupChatAttender` (
  `chatroom_id` varchar(255),
  `user_id` int,
  `secret_key` varchar(255),
  PRIMARY KEY (`chatroom_id`, `user_id`)
);

ALTER TABLE `profile` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`user_id2`) REFERENCES `account` (`user_id`);

ALTER TABLE `singleChatroom` ADD FOREIGN KEY (`owner_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `singleChatroom` ADD FOREIGN KEY (`attender_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `groupChatAttender` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `groupChatAttender` ADD FOREIGN KEY (`chatroom_id`) REFERENCES `groupChatroom` (`chatroom_id`);
