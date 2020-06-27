
export default (sequelize, DataTypes) => {
  const Files = sequelize.define('Files',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      uploadName: {
        type: DataTypes.STRING,
        allownNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      idTMDB: {
        type: DataTypes.INTEGER,
        allownNull: true
      },
      tag: {
        type: DataTypes.STRING,
        allownNull: false
      },
      uploadedBy: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      uploadAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

  return Files;
};
