const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // valor requerido
      },
    },
    {
      timestamps: false, // para evitar qque se creen las columnas de cuando se creo la receta/dieta
    }
  );
};
