'use strict'

module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  })

  task.associate = models => {
    models.task.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
  }

  return task
}
