'use strict'

module.exports = (sequelize, DataTypes) => {
  const userTask = sequelize.define('userTask', {
    status: DataTypes.STRING
  })

  userTask.associate = models => {
    models.userTask.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })

    models.userTask.belongsTo(models.task, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
  }

  return userTask
}
