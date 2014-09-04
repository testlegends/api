/**
 * StatsController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/25
 */

module.exports = (function () {

    function classStats (req, res) {
        StatsService.getClassStats(req.param('id'), function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function listStats (req, res) {
        StatsService.getListStats(req.param('id'), function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function updateGameStats (req, res) {
        StatsService.updateGameStats({
            gameId: req.param('id'),
            stats: req.body.stats
        }, function (err, data) {
            return res.json({
                status: 'OK'
            });
        })
    }

    function updateQuestionStats (req, res) {
        StatsService.updateGameStats({
            questionId: req.param('id'),
            stats: req.body.stats
        }, function (err, data) {
            return res.json({
                status: 'OK'
            });
        })
    }

    return {
        classStats: classStats,
        listStats: listStats,
        updateGameStats: updateGameStats,
        updateQuestionStats: updateQuestionStats,

        _config: {}
    };

})();
