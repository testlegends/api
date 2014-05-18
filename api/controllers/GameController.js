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
            'meta.creatorId': creatorId
        }, function(err, games){
            if (err) {
                console.log(err);
            }

            return res.json({
                data: games
            });
        });
    }

    function create (req, res) {
        // TODO need to check payment history
        var privateGameAvailable = true;

        var name = req.body.name;
        var scope = req.body.scope;

        if (privateGameAvailable) {
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
                    data: game
                });
            });
        } else {
            return res.json({
                err: 'NO_PRIVATE_AVALIABLE',
                msg: 'No private game available for your account'
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
                data: game
            });
        });
    }

    function update (req, res) {
        var gameId = req.param('id');

        return res.json({
            data: {}
        });
    }

    function remove (req, res) {
        return res.json({
            status: 'OK'
        });
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
