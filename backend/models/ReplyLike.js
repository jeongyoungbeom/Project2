const Sequelize = require('sequelize')

module.exports = class ReplyLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      memberId : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true
      },
      replyId : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true
      },
      createdAt : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW
      }
    }, {
      sequelize,
      timestamps : true,  // createAt, updateAt 자동생성
      underscored : false, // 기본 카멜표기법 true면 스네이크표기법 false면 카멜표기법
      paranoid : false, // deleteAt 자동생성(soft delete)
      modelName : 'ReplyLike',
      tableName : 'replyLikes',
      charset : 'utf8',
      collate: 'utf8_general_ci'
    })
  };

  static associate(db) {
    db.ReplyLike.belongsTo(db.Member, { foreignKey : 'memberId'})
    db.ReplyLike.belongsTo(db.Reply, { foreignKey : 'replyId'})
  }
}