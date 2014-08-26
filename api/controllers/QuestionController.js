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
        var gameId = req.param('id');

        Question.find({
            "meta.gameId": gameId
        }, function(err, questions){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: questions
            });
        });
    }

    function create (req, res) {
        var gameId = req.param('id');
        var wrongAnswers = Array.apply(null, new Array(req.body.num_wrongs)).map(Object.prototype.valueOf, { text: "" });

        // TODO caluclate the order here instead of frontend
        Question.create({
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
                status: 'OK',
                data: question
            });
        });
    }

    function find (req, res) {
        var questionId = req.param('qid');

        Question.findOne({
            id: questionId
        }, function(err, question){
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: question
            });
        });
    }

    function update (req, res) {
        var questionId = req.param('qid');

        if (req.body.stats) {
            Question.update({
                id: questionId
            }, {
                stats: req.body.stats
            }, function (err, question) {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: 'ERROR'
                    });
                }

                return res.json({
                    status: 'OK'
                });
            });
        } else {
            var wrongAnswersRaw = req.body.wrong.split(",");
            var wrongAnswers = [];
            for (var i in wrongAnswersRaw) {
                wrongAnswers.push({ text: wrongAnswersRaw[i] });
            }

            Question.update({
                id: questionId
            }, {
                content: req.body.content,
                options: {
                    correct: req.body.correct,
                    wrong: wrongAnswers
                }
            }, function (err, question) {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: 'ERROR'
                    });
                }

                return res.json({
                    status: 'OK',
                    data: question
                });
            });
        }
    }

    function remove (req, res) {
        var questionId = req.param('qid');

        Question.destroy({
            id: questionId
        }, function (err) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK'
            });
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
