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

        category: {
            type: 'string',
            in: ['geography', 'language', 'history', 'science', 'math', 'other'],
            defaultsTo: 'other'
        },

        terms : {
            type: 'array',
            defaultsTo: []
        },

        meta: {
            type: 'json',
            defaultsTo: {}
        },

        stats: {
            type: 'array',
            defaultsTo: []
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
