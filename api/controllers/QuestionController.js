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

    function create (req, res) {
        var gameId = req.body.gameId;
        var wrongAnswers = Array.apply(null, new Array(req.body.num_wrongs)).map(Object.prototype.valueOf, { text: "" });

        // TODO some validations on difficulty and type, put default if not valid
        // TODO caluclate the order here instead of frontend
        Question.create({
            difficulty: req.body.difficulty,
            type: req.body.type,
            options: {
                correct: '',
                wrong: wrongAnswers
            },
            meta: {
                gameId: gameId,
                order: req.body.order
            }
        }, function(err, question) {
            if (err) {
                console.log(err);
            }

            return res.json({
                data: question
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

            return res.json({
                data: question
            });
        });
    }

    function update (req, res) {
        var questionId = req.param('id');

        var wrongAnswersRaw = req.body.wrong.split(",");
        var wrongAnswers = [];
        for (var i in wrongAnswersRaw) {
            wrongAnswers.push({ text: wrongAnswersRaw[i] });
        }

        Question.update({
            id: questionId
        }, {
            difficulty: req.body.difficulty,
            type: req.body.type,
            content: req.body.content,
            options: {
                correct: req.body.correct,
                wrong: wrongAnswers
            }
        }, function (err, question) {
            if (err) {
                console.log(err);
            }

            return res.json({
                data: question
            });
        });
    }

    function remove (req, res) {
        return res.json({
            status: 'OK'
        });
    }

    return {
        index: index,
        create: create,
        find: find,
        update: update,
        remove: remove,

        _config: {}
    };

})();
