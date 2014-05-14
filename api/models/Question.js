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
            in: ['multiple']
        },

        difficulty: {
            type: 'string',
            in: ['easy', 'medium', 'hard']
        },

        content: {
            type: 'string'
        },

        options: {
            type: 'json'
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

    type: 'multiple',

    difficulty: 'easy',

    content: "Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of _______ despair.",

    options: {
        correct: 'abhor',
        wrong: [
            'abash',
            'adamant',
            'abject'
        ]
    },

    meta: {
        gameId: '1',
        order: 1
    },

    stats: {

    }

};
