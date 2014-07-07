/**
 * List
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/06/24
 */

module.exports = (function(){

    var tableName = 'lists';

    var attributes = {
        title: {
            type: 'string'
        },
        desc: {
            type: 'string'
        },
        terms : {
            type: 'array'
        },
        meta: {
            type: 'json'
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
