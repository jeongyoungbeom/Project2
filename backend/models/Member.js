const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email : {
                type : Sequelize.STRING(100),
                allowNull : false,
                unique : true
            },
            userPw : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            name : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            tel : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false
            },
            gender : {
                type : Sequelize.ENUM('남', '여'),
                allowNull : false
            },
            code : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            img : {
                type : Sequelize.STRING(100)
            },
            message : {
                type : Sequelize.STRING(500)
            },
            agreement1 : {
                type : Sequelize.ENUM('Y', 'N'),
                allowNull : false,
                defaultValue : 'N'
            },
            agreement2 : {
                type : Sequelize.ENUM('Y', 'N'),
                allowNull : false,
                defaultValue : 'N'
            },
            createdAt : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps : false,  // createAt, updateAt 자동생성
            underscored : false, // 기본 카멜표기법 true면 카멜표기법 false면 스네이크표기법
            paranoid : false, // deleteAt 자동생성(soft delete)
            modelName : 'Member',
            tableName : 'members',
            charset : 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
        db.Member.hasMany(db.Post, { foreignKey : 'memberId', sourceKey : 'id'})
        db.Member.hasMany(db.Reply, { foreignKey : 'memberId', sourceKey : 'id'})
        db.Member.belongsToMany(db.Post, { through : 'PostLike', foreignKey : 'memberId'})
        db.Member.belongsToMany(db.Reply, { through : 'ReplyLike', foreignKey : 'memberId'})
        db.Member.hasMany(db.RoomMem, { foreignKey : 'memberId', sourceKey : 'id'})
        db.Member.hasMany(db.Chat, { foreignKey : 'memberId', sourceKey : 'id'})
        db.Member.hasMany(db.Inquiry, { foreignKey : 'memberId', sourceKey : 'id'})
        db.Member.belongsToMany(db.Member, {as: 'Members', through : 'friends', foreignKey : 'MemberId'})
        db.Member.belongsToMany(db.Member, {as: 'Friends', through : 'friends', foreignKey : 'FriendId'})
    };
};