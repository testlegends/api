/**
 * Test DB Sample Data
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = {

    lists_test: [
        {
            title: 'Physics Class',
            desc: 'Grade 12 physics class',
            terms: [
                {
                    term: 'g',
                    definition: 'gravitational force',
                    options: [{ text: 'e' } , { text: 'c' }, { text: 'm' }]
                }
            ],
            meta: {
                oldListId: null,
                userId: 'abcdef1234567890deadbeef'
            }
        },
        {
            title: 'Math Class',
            desc: 'Grade 1 Math',
            terms: [
                {
                    term: 'm',
                    definition: 'meter',
                    options: []
                }
            ],
            meta: {
                oldListId: null,
                userId: '53562b9335e2098c4c0001fa'
            }
        }
    ],

    games_test: [
        {
            name: "Game of Thrones",
            monsters: [
                {
                    name: "monster",
                    type: "minion",
                    meta: {
                        character_src: "ufo.png",
                        attack: 10,
                        defense: 8,
                        hp: 100
                    }
                }
            ],
            background: "space.jpg",
            meta: {
                creatorId: "abcdef1234567890deadbeef",
                scope: "public",
                status: "published",
                default_options_per_question: 4,
                questions_per_stage: 5,
                time_per_question: 20
            },
            stats: {},
            _id: new ObjectID("53701a6556c4a5d9b400009d")
        },
        {
            name: "Hunger Game",
            monsters: [
                {
                    name: "monster",
                    type: "minion",
                    meta: {
                        character_src: "furball.png",
                        attack: 10,
                        defense: 8,
                        hp: 100
                    }
                }
            ],
            background: "forest.jpg",
            meta: {
                creatorId: "abcdef1234567890deadbeef",
                scope: "private",
                status: "draft",
                default_options_per_question: 4,
                questions_per_stage: 5,
                time_per_question: 20
            },
            stats: {},
            _id: new ObjectID("53701a95b2411a45f5000068")
        }
    ],

    questions_test: [
        {
            content: "Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of _______ despair.",
            difficulty: "easy",
            meta: {
                gameId: "53701a6556c4a5d9b400009d",
                order: 1
            },
            options: {
                correct: "abhor",
                wrong: [
                    { text: "abash" },
                    { text: "adamant" },
                    { text: "abject" }
                ]
            },
            stats: {},
            type: "multiple_choice"
        }
    ],

    heroes_test: [
        {
            name: "leejefon",
            type: "archer",
            skills: [
                "Ultimate"
            ],
            games: [
                {
                    id: "53701a6556c4a5d9b400009d",
                    questions_completed: 10
                }
            ],
            meta: {
                userId: "abcdef1234567890deadbeef",
                attack: 10,
                defense: 10,
                hp: 100,
                mana: 100
            },
            stats: {}
        }
    ],

    items_test: [
        {
            name: 'Shield of Agents',
            meta: {
                attack: -5,
                defense: 5
            }
        }
    ]

};
