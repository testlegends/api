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
console.log(req.user);
        return res.json({
            name: 'Jeff Lee'
        });
    }

    return {
        find: find,

        _config: {}
    };

})();
