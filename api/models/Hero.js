/**
 * Player
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    tableName: 'heroes',

    attributes: {
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

    name: 'leejefon',

    type: 'archer',

    skills: ['Ultimate'],

    meta: {
        userId: '1',
        attack: 10,
        hp: 100, // Max HP
        mana: 100 // Max Mana
    },

    stats: {

    }

};
