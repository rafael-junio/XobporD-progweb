
export default (sequelize, DataTypes) => {
    const Files = sequelize.define("Files", 
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            notEmpty: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER,
        },
        uploaded_by: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        }
    });

    return Files;
};