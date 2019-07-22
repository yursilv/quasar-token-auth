const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')

class GetCurrentUserAction extends BaseAction {
  static get accessTag () {
    return 'users:get-current-user'
  }

  static async run (ctx) {
    const { currentUser } = ctx.state
    const data = await UserDAO.baseGetById(currentUser.id)

    return this.result({ data })
  }
}

module.exports = GetCurrentUserAction