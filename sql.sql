use us_solo;
select * from members;
select * from posts;
select * from posreplyliketimgs;
select * from rooms;
select * from roommems;
select * from friends;
select * from chats;
select * from inquirys;

alter table rooms add type enum('일반', '그룹') default '일반' not null;
alter table posts add report enum('Y', 'N') default 'N' not null;
alter table inquirys add message varchar(500);

insert into postimgs(imgPath, imgName, createdAt, postId) values("1번", "1번", "2022-04-10", 1);

insert into members(email, userPw, name, tel, code, createdAt) values("1번이메일", "1번비밀번호", "1번이름", 1111, "1번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("2번이메일", "2번비밀번호", "2번이름", 2222, "2번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("3번이메일", "3번비밀번호", "3번이름", 3333, "3번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("4번이메일", "4번비밀번호", "4번이름", 4444, "4번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("5번이메일", "5번비밀번호", "5번이름", 5555, "5번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("6번이메일", "6번비밀번호", "6번이름", 6666, "6번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("7번이메일", "7번비밀번호", "7번이름", 7777, "7번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("8번이메일", "8번비밀번호", "8번이름", 8888, "8번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("9번이메일", "9번비밀번호", "9번이름", 9999, "9번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("10번이메일", "10번비밀번호", "10번이름", 1010, "10번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("11번이메일", "11번비밀번호", "11번이름", 1111, "11번코드", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("12번이메일", "12번비밀번호", "12번이름", 1212, "12번코드", "2022-04-10");


insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 2, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 3, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 4, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 5, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(2, 1, "2022-04-10", "2022-04-10");

insert into posts(title, content, createdAt, updatedAt, memberId) values('1번글제목', '1번글내용', '2022-04-22', '2022-04-22', 1);
insert into posts(title, content, createdAt, updatedAt, memberId) values('2번글제목', '2번글내용', '2022-04-22', '2022-04-22', 1);
insert into posts(title, content, createdAt, updatedAt, memberId) values('3번글제목', '3번글내용', '2022-04-22', '2022-04-22', 1);
insert into posts(title, content, createdAt, updatedAt, memberId) values('4번글제목', '4번글내용', '2022-04-22', '2022-04-22', 1);
insert into posts(title, content, createdAt, updatedAt, memberId) values('5번글제목', '5번글내용', '2022-04-22', '2022-04-22', 1);

insert into postimgs(imgPath, imgName, createdAt, postId) values("1번", "1번", "2022-04-10", 1);
insert into postimgs(imgPath, imgName, createdAt, postId) values("2번", "2번", "2022-04-11", 1);
insert into postimgs(imgPath, imgName, createdAt, postId) values("3번", "3번", "2022-04-12", 1);
insert into postimgs(imgPath, imgName, createdAt, postId) values("4번", "4번", "2022-04-13", 1);

insert into replys(parentId, groupId, groupNum, depth, content, createdAt, updatedAt, memberId, postId) values(1, 1, 1, 1, '1번댓글', '2022-04-23', '2022-04-23', 1, 1);

insert into rooms(title, report, createdAt) values("1번", "N", "2022-04-13");
insert into rooms(title, report, createdAt) values("2번", "N", "2022-04-13");

insert into roommems(memberId, roomId, createdAt) values(1, 2, "2022-04-23");
insert into roommems(memberId, roomId, createdAt) values(3, 1, "2022-04-13");
insert into roommems(memberId, roomId, createdAt) values(2, 1, "2022-04-13");

insert into chats(content, memberId, roomId, createdAt) values("안녕1", 1, 1, "2022-04-13");
insert into chats(content, memberId, roomId, createdAt) values("안녕2", 1, 1, "2022-04-13");
insert into chats(content, memberId, roomId, createdAt) values("안녕3", 1, 1, "2022-04-13");
insert into chats(content, memberId, roomId, createdAt) values("안녕4", 1, 1, "2022-04-13");
insert into chats(content, memberId, roomId, createdAt) values("안녕5", 1, 1, "2022-04-13");

insert into inquirys(title, content, createdAt, memberId) values('1번문의', '1번문의내용', '2022-04-26', 1);
insert into inquirys(title, content, createdAt, memberId) values('2번문의', '2번문의내용', '2022-04-26', 1);
insert into inquirys(title, content, createdAt, memberId) values('3번문의', '3번문의내용', '2022-04-26', 1);
insert into inquirys(title, content, createdAt, memberId) values('4번문의', '4번문의내용', '2022-04-26', 1);
insert into inquirys(title, content, createdAt, memberId) values('5번문의', '5번문의내용', '2022-04-26', 1);

alter table members add message varchar(500);
drop table friend;

select i.imgName, count(i.imgName) as cnt, i.postid, p.createdAt from posts as p join members as m on m.id = p.memberid join postimgs as i on p.id = i.postId where p.memberid = 1 group by i.postId; 
select Post.id, Post.createdAt, count(PostImgs.id) as cnt, postImgs.imgName from posts as Post join postimgs as PostImgs on Post.id = PostImgs.postId  where Post.memberId = 1;
select postimgs.imgName, count(postimgs.id), Postimgs.PostId, Posts.createdAt from postimgs join Posts on postimgs.PostId = Posts.id where Posts.MemberId group by PostImgs.postId;

select r.title, r.id as roomId, rm.memberId as friend, m.img, m.name, (select content from chats where createdAt = (select max(createdAt) from chats 
where roomId = r.id)) as chat, (select max(createdAt) from chats where roomId = r.id) as time from roommems as rm join members as m on rm.memberId = m.id join rooms as r on r.id = rm.roomId 
where r.title in (select title from roommems as rm join rooms as r on rm.roomId = r.id where rm.memberId = '1' ) and m.id != '1' group by title;

select m.id, m.img, m.email, m.name, m.message from members as m join friends as f on m.id = f.friendId where f.memberId = 1;
select * from members where id='2' limit 1;
select exists (select * from friends where memberId = 1 and friendId = 2 limit 1) as success;
select * from members limit 3, 5;
select m.email, m.name, p.content, p.createdAt from members as m inner join posts as p on m.id = p.memberId and p.id=3;
SELECT `Post`.`id`, `Post`.`content`, `Post`.`createdAt`, `Members`.`id` AS `Members.id`, `Members`.`email` AS `Members.email`, `Members`.`name` AS `Members.name`, `Members->PostLike`.`postId` AS `Members.PostLi
ke.postId`, `Members->PostLike`.`memberId` AS `Members.PostLike.memberId`, `Members->PostLike`.`createdAt` AS `Members.PostLike.createdAt` FROM `Posts` AS `Post` LEFT OUTER JOIN ( `postLikes` AS `Members->PostLike` INNER JOIN `members` AS `Members` ON `Members`.`id` = `Members->PostLike`.`memberId`) ON `Post`.`id` = `Members->PostLike`.`postId`;
select r.id, r.title, count(*) as ChatCnt, r.createdAt  from rooms as r join roommems as rm on r.id = rm.roomId 
group by r.title order by r.createdAt desc limit 0, 5;

SELECT `Room`.`id`, `Room`.`title`, `Room`.`createdAt` FROM `rooms` AS `Room` ORDER BY `Room`.`createdAt` DESC LIMIT 0, 5;
SELECT `Room`.*, `RoomMems`.`id` AS `RoomMems.id`, count(`RoomMems`.`id`) AS `RoomMems.cnt` FROM (SELECT `Room`.`id`, `Room`.`title`, `Room`.`createdAt` FROM `rooms` AS `Room` GROUP BY `title` ORDER BY `Room`.`createdAt` DESC LIMIT 0, 5) AS `Room` LEFT OUTER JOIN `roomMems` AS `RoomMems` ON `Room`.`id` = `RoomMems`.`roomId` ORDER BY `Room`.`createdAt` DESC;
select * from rooms as r join roommems as rm on r.id = rm.roomId group by r.title;
