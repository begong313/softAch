CREATE TABLE `account` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `public_key` Text NOT NULL
);

CREATE TABLE `friendship` (
  `user_id` int,
  `user_id2` int,
  PRIMARY KEY (`user_id`, `user_id2`)
);

CREATE TABLE `profile` (
  `user_id` int PRIMARY KEY,
  `nickname` varchar(255),
  `profile_pic` varchar(255)
);

CREATE TABLE `singleChatroom` (
  `user_id1` int,
  `user_id2` int,
  `user1_secret_key` Text NOT NULL,
  `user2_secret_key` Text NOT NULL,
  `room_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id1`, `user_id2`)
);

CREATE TABLE `groupChatroom` (
  `chatroom_id` int PRIMARY KEY,
  `room_name` varchar(255)
);

CREATE TABLE `groupChatAttender` (
  `chatroom_id` int,
  `user_id` int,
  `secret_key` Text,
  PRIMARY KEY (`chatroom_id`, `user_id`)
);

ALTER TABLE `profile` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`user_id2`) REFERENCES `account` (`user_id`);

ALTER TABLE `singleChatroom` ADD FOREIGN KEY (`user_id1`) REFERENCES `account` (`user_id`);

ALTER TABLE `singleChatroom` ADD FOREIGN KEY (`user_id2`) REFERENCES `account` (`user_id`);

ALTER TABLE `groupChatAttender` ADD FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

ALTER TABLE `groupChatAttender` ADD FOREIGN KEY (`chatroom_id`) REFERENCES `groupChatroom` (`chatroom_id`);
