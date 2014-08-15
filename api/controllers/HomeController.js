/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function () {

    function index (req, res) {
        return res.redirect('https://testlegends.com');
    }

    return {
        index: index,

        _config: {}
    };

})();
