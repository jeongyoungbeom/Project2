const Sequelize = require('sequelize');
const Answer = require('./Answer');
const Chat = require('./Chat');
const HashTag = require('./HashTag');
const Inquiry = require('./Inquiry');
const Member = require('./Member');
const Post = require('./Post');
const PostImg = require('./PostImg');
const Reply = require('./Reply');
const Room = require('./Room');
const RoomMem = require('./RoomMem')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Answer = Answer;
db.Chat = Chat;
db.HashTag = HashTag;
db.Inquiry = Inquiry;
db.Member = Member;
db.Post = Post;
db.PostImg = PostImg;
db.Reply = Reply;
db.Room = Room;
db.RoomMem = RoomMem;

Answer.init(sequelize);
Chat.init(sequelize);
HashTag.init(sequelize);
Inquiry.init(sequelize);
Member.init(sequelize);
Post.init(sequelize);
PostImg.init(sequelize);
Reply.init(sequelize);
Room.init(sequelize);
RoomMem.init(sequelize);

Chat.associate(db);
HashTag.associate(db);
Inquiry.associate(db);
Member.associate(db);
Post.associate(db);
PostImg.associate(db);
Reply.associate(db);
Room.associate(db);
RoomMem.associate(db);


module.exports = db;
