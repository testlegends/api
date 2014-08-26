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

        settings: {
            type: 'json',
            defaultsTo: {
                timer: 20,
                heroHealth: 5,
                theme: 'forest',    // Options: forest, space, ...
                scope: 'public',    // Options: public, private
                status: 'published' // Options: published, draft, trashed
            }
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
