/**
 * Question
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    tableName: 'questions',

    attributes: {
        type: {
            type: 'string',
            in: ['multiple_choice', 'fill_blank', 'short_answer'],
            defaultsTo: 'multiple_choice'
        },

        difficulty: {
            type: 'string',
            in: ['easy', 'medium', 'hard'],
            defaultsTo: 'easy'
        },

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
    }

};

var example = {

    type: 'multiple',

    difficulty: 'easy',

    content: "Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of _______ despair.",

    options: {
        correct: 'abhor',
        wrong: [
            { text: 'abash' },
            { text: 'adamant' },
            { text: 'abject' }
        ]
    },

    meta: {
        gameId: '1',
        order: 1
    },

    stats: {

    }

};
