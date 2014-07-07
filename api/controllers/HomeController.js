/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = {

    index: function (req, res) {
        return res.redirect('http://testlegends.com');
    },

    _config: {}

};
