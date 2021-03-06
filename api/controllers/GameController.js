/**
 * GameController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function () {

    function index (req, res) {
        // login as
        if (req.query.loginAs && req.user.role === 'admin') {
            User.findOneByEmail(req.query.loginAs, function (err, user) {
                if (user) {
                    Game.find({
                        'meta.creatorId': user.id,
                        'settings.status': {
                            '!': 'trashed'
                        }
                    }, function(err, games){
                        if (err) {
                            console.log(err);
                            return res.json({
                                status: 'ERROR',
                                data: err
                            })
                        }

                        return res.json({
                            status: 'OK',
                            data: games
                        });
                    });
                } else {
                    return res.json({
                        status: 'ERROR',
                        data: 'User not found'
                    });
                }
            });
        } else {
            Game.find({
                'meta.creatorId': req.user.id,
                'settings.status': {
                    '!': 'trashed'
                }
            }, function(err, games){
                if (err) {
                    console.log(err);
                    return res.json({
                        status: 'ERROR',
                        data: err
                    })
                }

                return res.json({
                    status: 'OK',
                    data: games
                });
            });
        }
    }

    function create (req, res) {
        if (req.body.listId) {
            GameService.generateFromList({
                listId: req.body.listId,
                heroHealth: req.body.heroHealth,
                timer: req.body.timer,
                classId: req.body.classId
            }, function (err, game) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: game
                });
            });
        } else { // Only internal use
            var name = req.body.name;

            Game.create({
                name: name,
                meta: {
                    creatorId: req.user.id,
                }
            }, function (err, game) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: game
                });
            });
        }
    }

    function find (req, res) {
        var gameId = req.param('id');

        Game.findOne({
            id: gameId
        }, function(err, game){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: game
            });
        });
    }

    function update (req, res) {
        var gameId = req.param('id');

        return res.json({
            status: 'OK',
            data: null
        });
    }

    function remove (req, res) {
        var gameId = req.param('id');
        var permanent = req.query.permanent === 1 ? true : false;

        if (permanent) {
            Game.destroy({
                id: gameId
            }, function (err) {
                if (err) {
                    console.log(err);
                }

                Question.destroy({
                    'meta.gameId': gameId
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }

                    return res.json({
                        status: 'OK'
                    });
                });
            });
        } else {
            Game.update({
                id: gameId
            }, {
                "meta.status": "trashed"
            }, function (err) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK'
                });
            });
        }
    }

    return {
        index: index,
        create: create,
        find: find,
        update: update,
        remove: remove,

        _config: {}
    };

})();
