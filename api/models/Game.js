/**
 * Game
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    tableName: 'games',

    attributes: {
        name: {
            type: 'string'
        },

        monsters: {
            type: 'arary'
        },

        background: {
            type: 'string',
            defaultsTo: 'forest.jpg'
        },

        meta: {
            type: 'json'
        },

        stats: {
            type: 'json'
        }
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
        questions_per_stage: 20,
        time_per_question: 20 //seconds
    },

    stats: {

    }

};
