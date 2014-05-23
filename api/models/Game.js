/**
 * Game
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function(){

    var tableName = 'games';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        monsters: {
            type: 'arary',
            defaultsTo: []
        },

        background: {
            type: 'string',
            defaultsTo: 'forest.jpg'
        },

        meta: {
            type: 'json',
            defaultsTo: {}
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
