/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

    '/': 'HomeController.index',

    'GET /user': 'UserController.find', // get current user info

    'GET /heroes':   'HeroController.index',
    'GET /hero/:id': 'HeroController.find',

    'GET /games':    'GameController.index', // for creators (teachers) only
    'PUT /games':    'GameController.create',
    'GET /game/:id': 'GameController.find',

    'GET /questions':    'QuestionController.index', // need gameId param
    'GET /question/:id': 'QuestionController.find'

};
