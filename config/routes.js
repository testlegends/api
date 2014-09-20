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

    'GET  /user'    : 'UserController.user', // get current user info
    'GET  /users'   : 'UserController.index',
    'GET  /user/:id': 'UserController.find',

    'GET    /classes'  : 'ClassController.index',
    'PUT    /classes'  : 'ClassController.create',
    'GET    /class/:id': 'ClassController.find',
    'DELETE /class/:id': 'ClassController.remove',

    'GET    /class/:id/students'    : 'ClassController.getStudents',
    'PUT    /class/:id/students'    : 'ClassController.addStudent',
    'GET    /class/:id/student/:sid': 'ClassController.findStudent',
    'DELETE /class/:id/student/:sid': 'ClassController.removeStudent',

    'GET    /class/:id/lists'       : 'ClassController.getLists',
    'PUT    /class/:id/lists'       : 'ClassController.addLists',
    'GET    /class/:id/list/:lid'   : 'ClassController.findList',
    'DELETE /class/:id/list/:lid'   : 'ClassController.removeList',

    'GET    /lists'   : 'ListController.index',
    'PUT    /lists'   : 'ListController.create',
    'GET    /list/:id': 'ListController.find',
    'POST   /list/:id': 'ListController.update',
    'DELETE /list/:id': 'ListController.remove',

    // TODO: to be implemented
    // 'GET    /list/:id/terms'      : 'ListController.getTerms',
    // 'PUT    /list/:id/terms'      : 'ListController.addTerm',
    // 'GET    /list/:id/terms/:term': 'ListController.findTerm',
    // 'DELETE /list/:id/terms/:term': 'ListController.removeTerm',

    'GET    /games'   : 'GameController.index',
    'PUT    /games'   : 'GameController.create',
    'GET    /game/:id': 'GameController.find',
    'POST   /game/:id': 'GameController.update',
    'DELETE /game/:id': 'GameController.remove',

    'GET    /game/:id/questions'    : 'QuestionController.index',
    'PUT    /game/:id/questions'    : 'QuestionController.create',
    'GET    /game/:id/question/:qid': 'QuestionController.find',   // GameId not needed
    'POST   /game/:id/question/:qid': 'QuestionController.update', // GameId not needed
    'DELETE /game/:id/question/:qid': 'QuestionController.remove', // GameId not needed

    'GET  /stats/class/:id': 'StatsController.classStats',
    'GET  /stats/list/:id' : 'StatsController.listStats',
    'PUT  /stats/game/:id' : 'StatsController.updateGameStats',
    'PUT  /stats/question/:id' : 'StatsController.updateQuestionStats',
};
