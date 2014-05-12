/**
 * PlayerController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/21
 */

module.exports = (function () {

    function index (req, res) {
        return res.json({
            name: 'Jeff Lee',
            lvl: 100
        });
    }

    function find (req, res) {

    }

    return {
        index: index,
        find: find,

        _config: {}
    };

})();
