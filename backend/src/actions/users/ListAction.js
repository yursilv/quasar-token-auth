const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  static get accessTag () {
    return 'users:list'
  }

  static get validationRules () {
    return {
      query: this.joi.object({
        ...this.baseQueryParams,
        filter: this.joi.object({
          username: this.joi.string().min(3)
        })
      })
    }
  }

  static async run (ctx) {
    const { query } = ctx.request
    const data = await UserDAO.baseGetList({ ...query })

    return this.result({
      data: data.results,
      headers: {
        'X-Total-Count': data.total
      }
    })
  }
}

module.exports = ListAction