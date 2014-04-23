/**
 * AccessToken
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    connection: 'mongodb_dev',

    tableName: 'access_tokens',

    attributes: {
        userId: {
            type: 'string'
        },
        clientId: {
            type: 'string'
        },
        token: {
            type: 'string'
        }
    }
};
