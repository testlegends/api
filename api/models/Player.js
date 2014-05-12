/**
 * Player
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    tableName: 'players',

    attributes: {
        userId: {
            type: 'string'
        },

        name: {
            type: 'string'
        },

        type: {
            type: 'string',
            in: ['archer', 'magician']
        },

        skills: {
            type: 'array',
            in: ['Ultimate']
        },

        games: {
            type: 'array'
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

    userId: '1',

    name: 'leejefon',

    type: 'archer',

    skills: ['Ultimate'],

    games: [
        {
            id: "1",
            questions_completed: 10
        }
    ],

    meta: {
        attack: 10,
        hp: 100, // Max HP
        mana: 100 // Max Mana
    }

};
