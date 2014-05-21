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

    var example = {
        name: 'Sword',

        meta: {
            hp: -10,
            attack: 5
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
