/**
 * List Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/22
 */

var validator = require('validator');

module.exports = (function(){

    function create (params, cb) {
        cb(null, {});
    }

    function find (params, cb) {
        cb(null, {});
    }

    function destroy (params, cb) {
        cb(null, {});
    }

    return {
        create: create,
        find: find,
        destroy: destroy
    };
})();
