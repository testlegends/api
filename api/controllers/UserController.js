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

        User.findOnebyId(id, function (err, user) {
            return res.json({
                status: 'OK',
                data: user
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
        user: user,

        _config: {}
    };

})();
