'use strict'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  })

  user.associate = models => {
    models.user.hasMany(models.task)
  }

  return user
}
