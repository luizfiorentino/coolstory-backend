"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      space.belongsTo(models.user, { foreignKey: "userId" });
      space.hasMany(models.story, { foreignKey: "spaceId" });
    }
  }
  space.init(
    {
      //email: { type: DataTypes.STRING, allowNull: false, unique: true }
      title: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      backgroundColor: { type: DataTypes.STRING, defaultValue: "#ffffff" },
      color: { type: DataTypes.STRING, defaultValue: "#000000" },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};
