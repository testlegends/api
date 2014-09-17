/**
 * Test DB Sample Data
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = {

    classes_test: [
        {
            name: 'SAT Class 1',
            desc: '',
            lists: [
                { id: '' },
                { id: '' }
            ],
            students: [
                {
                    id: '',
                    games: []
                }
            ],
            meta: {
                userId: ''
            },
            stats: {}
        },
        {
            name: 'SAT Class 2',
            desc: '',
            lists: [
                { id: '' },
                { id: '' }
            ],
            students: [
                {

                }
            ],
            meta: {
                userId: ''
            },
            stats: {}
        }
    ],

    lists_test: [
        {
            title: 'Physics',
            desc: 'Grade 12 physics class',
            category: 'science',
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
            title: 'Math',
            desc: 'Grade 1 Math',
            category: 'math',
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
            },
            stats: [
                {
                    classId: '',
                    studentsPlayed: []
                }
            ]
        }
    ],

    games_test: [
        {
            name: "Game of Thrones",
            settings: {
                timer: 20,
                hero_life: 5,
                theme: "space",
                scope: "public",
                status: "published",
            },
            meta: {
                creatorId: "abcdef1234567890deadbeef",
                listId: ''
            },
            stats: {},
            _id: new ObjectID("53701a6556c4a5d9b400009d")
        },
        {
            name: "Hunger Game",
            settings: {
                timer: 20,
                hero_life: 5,
                theme: "forest",
                scope: "private",
                status: "draft",
            },
            meta: {
                creatorId: "abcdef1234567890deadbeef",
                listId: ''
            },
            stats: {},
            _id: new ObjectID("53701a95b2411a45f5000068")
        }
    ],

    questions_test: [
        {
            content: "Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of _______ despair.",
            options: {
                correct: "abhor",
                wrong: [
                    { text: "abash" },
                    { text: "adamant" },
                    { text: "abject" }
                ]
            },
            meta: {
                gameId: "53701a6556c4a5d9b400009d",
                order: 1
            },
            stats: {
                answerSelected: '',
                timeSpent: ''
            }
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
