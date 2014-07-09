/**
 * UserController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

module.exports = (function () {

    // Used for OAuth for now
    function find (req, res) {
        var user = req.user;

        delete user.password;
        delete user.password_reset_key;

        return res.json(user);
    }

    return {
        find: find,

        _config: {}
    };

})();
