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

    var example = {
        name: 'Game of Thrones',

        monsters: [
            {
                name: 'monster',
                type: 'minion',
                meta: {
                    character_src: 'ufo.png',
                    attack: 10,
                    defense: 8,
                    hp: 100
                }
            }
        ],

        background: 'space.jpg',

        meta: {
            creatorId: "1", // userId
            scope: "public",
            status: "draft",
            default_options_per_question: 4,
            questions_per_stage: 20,
            time_per_question: 20, //seconds
            stuff_to_give_out: {

            }
        },

        stats: {

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
