/**
 * Player
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function(){

    var tableName = 'heroes';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        type: {
            type: 'string',
            in: ['archer', 'magician'],
            defaultsTo: 'archer'
        },

        skills: {
            type: 'array',
            in: ['Ultimate'],
            defaultsTo: []
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
