const BaseDAO = require('../core/BaseDAO')

class UserDAO extends BaseDAO {
  static get tableName () {
    return 'users'
  }

  static get jsonAttributes () {
    return ['refreshTokensMap']
  }

  static get relationMappings () {
    return {
      posts: {
        relation: BaseDAO.HasManyRelation,
        modelClass: `${__dirname}/PostDAO`,
        join: {
          from: 'users.id',
          to: 'posts.userId'
        }
      }
    }
  }

  /**
   * ------------------------------
   * @HOOKS
   * ------------------------------
   */
  $formatJson (json) {
    json = super.$formatJson(json)

    delete json.passwordHash
    delete json.tokenReset
    delete json.avatar

    return json
  }

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

  static create (data) {
    return this.query().insert(data)
  };

  static async getByEmail (email) {
    const data = await this.query().where({ email }).first()
    if (!data) throw this.errorEmptyResponse()
    return data
  }

  /**
   * @description check email availability in DB.
   * @param email
   * @returns {Promise<boolean>}
   */
  static isEmailExist (email) {
    return this.query().where({ email }).first()
      .then(data => Boolean(data))
      .catch(error => { throw error })
  }
}

module.exports = UserDAO