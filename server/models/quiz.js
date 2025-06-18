const Sequelize = require("sequelize");

module.exports = class Quiz extends Sequelize.Model {
  static initiate(sequelize) {
    Quiz.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        question: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        passage: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        choice1: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        choice2: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        choice3: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        choice4: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        choice5: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        answer: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Quiz",
        tableName: "quiz_1",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
