select * from members;
select * from posts;
select * from postimgs;
select * from rooms;
select * from roommems;
select * from friends;

insert into members(email, userPw, name, tel, code, createdAt) values("1번", "1번", "1번", 1111, "1번", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("2번", "2번", "2번", 2222, "2번", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("3번", "3번", "3번", 3333, "3번", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("4번", "4번", "4번", 4444, "4번", "2022-04-10");
insert into members(email, userPw, name, tel, code, createdAt) values("5번", "5번", "5번", 5555, "5번", "2022-04-10");

insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 2, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 3, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 4, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(1, 5, "2022-04-10", "2022-04-10");
insert into friends(memberId, friendId, createdAt, updatedAt) values(2, 1, "2022-04-10", "2022-04-10");

insert into postimgs(imgPath, imgName, createdAt, postId) values("6번", "6번", "2022-04-10", 2);
insert into postimgs(imgPath, imgName, createdAt, postId) values("7번", "7번", "2022-04-11", 2);
insert into postimgs(imgPath, imgName, createdAt, postId) values("8번", "8번", "2022-04-12", 2);
insert into postimgs(imgPath, imgName, createdAt, postId) values("9번", "9번", "2022-04-13", 2);

insert into rooms(title, report, createdAt) values("1번", "N", "2022-04-13");

insert into roommems(memberId, roomId, createdAt) values(1, 1, "2022-04-13");
insert into roommems(memberId, roomId, createdAt) values(2, 1, "2022-04-13");

insert into chats(content, memberId, roomId, createdAt) values("안녕", 1, 1, "2022-04-13");

alter table members add message varchar(500);
drop table friend;

select i.imgName, count(i.imgName) as cnt, i.postid, p.createdAt from posts as p join members as m on m.id = p.memberid join postimgs as i on p.id = i.postId where p.memberid = 1 group by i.postId; 
select Post.id, Post.createdAt, count(PostImgs.id) as cnt, postImgs.imgName from posts as Post join postimgs as PostImgs on Post.id = PostImgs.postId  where Post.memberId = 1;
select postimgs.imgName, count(postimgs.id), Postimgs.PostId, Posts.createdAt from postimgs join Posts on postimgs.PostId = Posts.id where Posts.MemberId group by PostImgs.postId;

select r.title, r.id as roomId, rm.memberId as friend, m.img, m.name, (select content from chats where createdAt = (select max(createdAt) from chats 
where roomId = r.id)) as chat, (select max(createdAt) from chats where roomId = r.id) as time from roommems as rm join members as m on rm.memberId = m.id join rooms as r on r.id = rm.roomId 
where r.title in (select title from roommems as rm join rooms as r on rm.roomId = r.id where rm.memberId = '1' ) and m.id != '1' group by title;

select m.id, m.img, m.email, m.name, m.message from members as m join friends as f on m.id = f.friendId where f.memberId = 1;