/**
 * Question
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function(){

    var tableName = 'questions';

    var attributes = {
        content: {
            type: 'string',
            defaultsTo: null
        },

        options: {
            type: 'json',
            defaultsTo: {}
        },

        meta: {
            type: 'json'
        },

        stats: {
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
