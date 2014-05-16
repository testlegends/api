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

        games: {
            type: 'array',
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
