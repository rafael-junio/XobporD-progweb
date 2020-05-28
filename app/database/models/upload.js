
export default (sequelize, DataTypes) => {
  const Files = sequelize.define('Files',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        notEmpty: true,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      uploadName: {
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
    });

  return Files;
};
