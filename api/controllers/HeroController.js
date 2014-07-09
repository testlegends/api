/**
 * HeroController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/21
 */

module.exports = (function () {

    function index (req, res) {
        var userId = req.user.id;

        Hero.find({
            "meta.userId": userId
        }, function(err, heroes){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: heroes
            });
        });
    }

    function find (req, res) {
        var heroId = req.param('id');

        Hero.findOne({
            id: heroId
        }, function(err, hero){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: hero
            });
        });
    }

    return {
        index: index,
        find: find,

        _config: {}
    };

})();
