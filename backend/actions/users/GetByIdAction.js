const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')

/**
 * @description return user by id
 */
class GetByIdAction extends BaseAction {
  static get accessTag () {
    return 'users:get-by-id'
  }

  static get validationRules () {
    return {
      params: this.joi.object().keys({
        id: this.joi.number().integer().positive().required()
      })
    }
  }

  static async run (ctx) {
    const model = await UserDAO.baseGetById(ctx.request.params.id)

    return this.result({ data: model })
  }
}

module.exports = GetByIdAction