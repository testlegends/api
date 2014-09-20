/**
 * UserController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

module.exports = (function () {

    function find (req, res) {
        var id = req.param('id');

        User.findOneById(id, function (err, user) {
            return res.json({
                status: 'OK',
                data: user
            });
        });
    }

    function index (req, res) {
        User.find({}, function (err, users) {
            return res.json({
                status: 'OK',
                data: users
            });
        });
    }

    // Used for OAuth for now
    function user (req, res) {
        var user = req.user;

        delete user.password;
        delete user.password_reset_key;

        return res.json(user);
    }

    return {
        find: find,
        index: index,
        user: user,

        _config: {}
    };

})();
