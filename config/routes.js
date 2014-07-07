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

    'GET  /user': 'UserController.find', // get current user info

    'GET  /heroes':   'HeroController.index',
    'GET  /hero/:id': 'HeroController.find',

    'GET    /games':    'GameController.index',
    'PUT    /games':    'GameController.create',
    'GET    /game/:id': 'GameController.find',
    'POST   /game/:id': 'GameController.update',
    'DELETE /game/:id': 'GameController.remove',

    'GET    /questions':    'QuestionController.index', // need gameId param
    'PUT    /questions':    'QuestionController.create',
    'GET    /question/:id': 'QuestionController.find',
    'POST   /question/:id': 'QuestionController.update',
    'DELETE /question/:id': 'QuestionController.remove',

    'GET    /lists':     'ListController.index',
    'PUT    /lists':     'ListController.create',
    'GET    /list/:id': 'ListController.find',
    'POST   /list/:id': 'ListController.update',
    'DELETE /list/:id': 'ListController.remove'
};
