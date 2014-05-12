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
                error: 'TEACHER_ONLY',
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

            return res.json(games);
        });
    }

    function find (req, res) {
        var gameId = req.param('id');

        Game.findOne({
            id: gameId
        }, function(err, game){
            if (err) {
                console.log(err);
            }

            return res.json(game);
        });
    }

    return {
        index: index,
        find: find,

        _config: {}
    };

})();
