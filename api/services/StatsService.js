/**
 * Stats Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/25
 */

var _ = require('underscore');

module.exports = (function(){

    function getClassStats (id, cb) {
        // TODO: change to use promise instead of multi-level callbacks
        Class.findOneById(id, function (err, classObj) {
            var listIds = classObj.lists.map(function (list) {
                return list.id;
            });

            Game.find({ 'meta.listId': { '$in': listIds } }, function (err, games) {
                if (games.length === 0) {
                    return cb(null, {});
                }

                var gameIds = games.map(function (game) {
                    return game.id;
                });

                Question.find({ 'meta.gameId': { '$in': gameIds } }, function (err, questions) {
                    return cb(null, questions.map(function (question) {
                        var gameInfo = _getInfoByGameId(games, question.meta.gameId);
                        return {
                            userId: gameInfo.userId,
                            listId: gameInfo.listId,
                            gameId: question.meta.gameId,
                            correct: question.options.correct,
                            timeSpent: gameInfo.timePerQuestion - question.stats.remainingTime,
                            selectedAnswer: question.stats.selectedAnswer
                        };
                    }).reduce(function (prev, curr) {
                        var studentIndex = _checkIdExists(prev.studentStats, curr.userId);
                        if (studentIndex !== -1) {
                            var listIndex = _checkIdExists(prev.studentStats[studentIndex].listsPlayed, curr.listId);
                            if (listIndex !== -1) {
                                prev.studentStats[studentIndex].listsPlayed[listIndex].gotWrong = _getWrongOptions(
                                    curr.correct, curr.selectedAnswer,
                                    prev.studentStats[studentIndex].listsPlayed[listIndex].gotWrong
                                );
                                prev.studentStats[studentIndex].listsPlayed[listIndex].playCount++;
                            } else {
                                var newStats = {
                                    id: curr.listId,
                                    gotWrong: _getWrongOptions(curr.correct, curr.selectedAnswer, []),
                                    playCount: 1
                                };

                                prev.studentStats[studentIndex].listsPlayed.push(newStats);
                            }

                            var gameIndex = _checkIdExists(prev.studentStats[studentIndex].gamesPlayed, curr.gameId);
                            if (gameIndex !== -1) {
                                prev.studentStats[studentIndex].gamesPlayed[gameIndex].gotWrong = _getWrongOptions(
                                    curr.correct, curr.selectedAnswer,
                                    prev.studentStats[studentIndex].gamesPlayed[gameIndex].gotWrong
                                );
                                prev.studentStats[studentIndex].gamesPlayed[gameIndex].totalTime += curr.timeSpent;
                                prev.studentStats[studentIndex].gamesPlayed[gameIndex].totalQuestions++;
                            } else {
                                var newStats = {
                                    id: curr.gameId,
                                    gotWrong: _getWrongOptions(curr.correct, curr.selectedAnswer, []),
                                    totalTime: curr.timeSpent,
                                    totalQuestions: 1
                                };

                                prev.studentStats[studentIndex].gamesPlayed.push(newStats);
                            }
                        } else {
                            var newStats = {
                                id: curr.userId,
                                listsPlayed: [{
                                    id: curr.listId,
                                    gotWrong: _getWrongOptions(curr.correct, curr.selectedAnswer, []),
                                    playCount: 1
                                }],
                                gamesPlayed: [{
                                    id: curr.gameId,
                                    gotWrong: _getWrongOptions(curr.correct, curr.selectedAnswer, []),
                                    totalTime: curr.timeSpent,
                                    totalQuestions: 1
                                }]
                            };

                            prev.studentStats.push(newStats);
                        }

                        var listIndex = _checkIdExists(prev.listStats, curr.listId);
                        if (listIndex !== -1) {
                            if (prev.listStats[listIndex].finishedStudents.indexOf(curr.userId) === -1) {
                                prev.listStats[listIndex].finishedStudents.push(curr.userId);
                            }

                            var termIndex = _checkIdExists(prev.listStats[listIndex].terms, curr.correct);
                            if (termIndex !== -1) {
                                prev.listStats[listIndex].terms[termIndex].gotWrong = _getWrongStudents(
                                    curr.correct, curr.selectedAnswer, curr.userId,
                                    prev.listStats[listIndex].terms[termIndex].gotWrong
                                );
                            } else {
                                var newStats = {
                                    id: curr.correct,
                                    gotWrong: _getWrongStudents(curr.correct, curr.selectedAnswer, curr.userId, [])
                                };

                                prev.listStats[listIndex].terms.push(newStats);
                            }
                        } else {
                            var newStats = {
                                id: curr.listId,
                                finishedStudents: [curr.userId],
                                terms: [{
                                    id: curr.correct, gotWrong: _getWrongStudents(curr.correct, curr.selectedAnswer, curr.userId, [])
                                }]
                            };

                            prev.listStats.push(newStats);
                        }

                        return prev;
                    }, {
                        totalStudents: classObj.students.length,
                        totalLists: classObj.lists.length,
                        studentStats: [],
                        listStats: []
                    }));
                });
            });
        });
    }

    function getListStats (id, cb) {
        cb(null, {});
    }

    function updateGameStats (params, cb) {
        cb(null, {});
    }

    function updateQuestionStats (params, cb) {
        Question.findOneById(params.questionId, function (err, question) {
            if (question) {
                question.stats = params.stats;
                question.save(function(){
                    cb(null, {});
                });
            }
        });
    }

    function _getInfoByGameId(games, gameId) {
        for (var i = 0; i < games.length; i++) {
            if (games[i].id === gameId) {
                return {
                    listId: games[i].meta.listId,
                    userId: games[i].meta.creatorId,
                    timePerQuestion: games[i].settings.timer
                };
            }
        }

        return {
            listId: null,
            userId: null,
            timePerQuestion: 0
        };
    }

    function _checkIdExists (arr, id) {
        var result = -1;
        for (var key in arr) {
            if (arr[key].id === id) {
                result = key;
                break;
            }
        }
        return result;
    }

    function _getWrongOptions (correct, selected, currentList) {
        if (correct === selected) {
            return currentList;
        } else {
            return _.union(currentList, [correct, selected]);
        }
    }

    function _getWrongStudents (correct, selected, student, currentStudentList) {
        if (correct === selected) {
            return currentStudentList;
        } else {
            return _.union(currentStudentList, [student]);
        }
    }

    return {
        getClassStats: getClassStats,
        getListStats: getListStats,
        updateGameStats: updateGameStats,
        updateQuestionStats: updateQuestionStats
    };
})();
