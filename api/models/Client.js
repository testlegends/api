/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    connection: 'mongodb_dev',

    tableName: 'clients',

    attributes: {
        name: {
            type: 'string'
        },
        clientSecret: {
            type: 'string'
        }
    }
};
