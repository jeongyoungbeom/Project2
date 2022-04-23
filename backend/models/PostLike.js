const Sequelize = require('sequelize');

module.exports = class PostLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      postId : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true
      },
      memberId : {
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
      timestamps : false,  // createAt, updateAt 자동생성
      underscored : false, // 기본 카멜표기법 true면 카멜표기법 false면 스네이크표기법
      paranoid : false, // deleteAt 자동생성(soft delete)
      modelName : 'PostLike',
      tableName : 'postLikes',
      charset : 'utf8',
      collate: 'utf8_general_ci'
    })
  };

  static associate(db) {
    db.PostLike.belongsTo(db.Member, { foreignKey : 'memberId'});
    db.PostLike.belongsTo(db.Post, { foreignKey : 'postId'});
  }
}