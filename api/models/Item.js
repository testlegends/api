/**
 * Item
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

module.exports = (function(){

    var tableName = 'items';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        meta: {
            type: 'json',
            defaultsTo: {}
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
