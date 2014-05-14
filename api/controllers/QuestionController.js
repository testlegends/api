/**
 * QuestionController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

module.exports = (function () {

    function index (req, res) {
        var gameId = req.query.gameId;

        if (!gameId) {
            return res.json({
                error: 'GAME_ID_NOT_FOUND',
                msg: 'Game ID is required to get the list of questions'
            });
        }

        Question.find({
            "meta.gameId": gameId
        }, function(err, questions){
            if (err) {
                console.log(err);
            }

            return res.json({
                data: questions
            });
        });
    }

    function find (req, res) {
        var questionId = req.param('id');

        Question.findOne({
            id: questionId
        }, function(err, question){
            if (err) {
                console.log(err);
            }

            return res.json(question);
        });
    }

    return {
        index: index,
        find: find,

        _config: {}
    };

})();
