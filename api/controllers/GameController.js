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
        var role = req.user.role;

        if (role !== 'admin' && role !== 'teacher') {
            return res.json({
                err: 'TEACHER_ONLY',
                msg: 'This API operation is for teacher only.'
            });
        }

        var creatorId = req.user.id;

        Game.find({
            'meta.creatorId': creatorId,
            'meta.status': {
                '!': 'trashed'
            }
        }, function(err, games){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: games
            });
        });
    }

    function create (req, res) {
        if (req.body.list) {
            GameService.generateFromList(req.body.list, function (err, game) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: game
                });
            });

        } else {
            var name = req.body.name;
            var scope = req.body.scope;

            Game.create({
                name: name,
                meta: {
                    creatorId: req.user.id,
                    scope: scope,
                    status: 'draft'
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
