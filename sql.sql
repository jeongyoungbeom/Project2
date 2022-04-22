use us_solo;
select * from members;
select * from posts;
select * from postimgs;
select * from rooms;
select * from roommems;
select * from friends;


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
select * from members where id='2' limit 1;
select exists (select * from friends where memberId = 1 and friendId = 2 limit 1) as success;
select * from members limit 3, 5;