/**
 * Stats Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/25
 */

var validator = require('validator');

module.exports = (function(){

    function getClassStats (id, cb) {
        cb(null, {});
    }

    function getListStats (id, cb) {
        cb(null, {});
    }

    function updateGameStats (params, cb) {
        cb(null, {});
    }

    function updateQuestionStats (params, cb) {
        cb(null, {});
    }

    return {
        getClassStats: getClassStats,
        getListStats: getListStats,
        updateGameStats: updateGameStats,
        updateQuestionStats: updateQuestionStats
    };
})();
