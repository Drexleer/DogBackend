const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'temperament',
        {
            //no ponemos el id, sequelize lo haca automático
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            // Desactivamos las fechas.
            timestamps: false,
        }
    );
};