/**
 * Stats Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/09/25
 */

var _ = require('underscore');

module.exports = (function(){

    function getClassStats (id, cb) {
        // TODO: change to use promise instead of multi-level callbacks
        Class.findOneById(id, function (err, classObj) {

            // Hack: currently in list page it calls class stats, need to get rid of this after list stats is done
            if (!classObj) {
                return cb(null, {});
            }

            var listIds = classObj.lists.map(function (list) {
                return list.id;
            });

            var studentIds = classObj.students.map(function (student) {
                return student.id;
            });

            List.find({ id: listIds }, function (err, lists) {
                User.find({ id: studentIds }, function (err, users) {

                    // TODO: need to add classId
                    Game.find({ 'meta.listId': { '$in': listIds }, 'meta.classId': classObj.id }, function (err, games) {
                        if (games.length === 0) {
                            return cb(null, {});
                        }

                        var gameIds = games.map(function (game) {
                            return game.id;
                        });

                        Question.find({ 'meta.gameId': { '$in': gameIds } }, function (err, questions) {
                            return cb(null, questions.map(function (question) {
                                var gameInfo = _getInfoByGameId(games, question.meta.gameId);
                                var userInfo = _getInfoByUserId(users, gameInfo.userId);
                                var listInfo = _getInfoByListId(lists, gameInfo.listId);

                                return {
                                    user: userInfo,
                                    list: listInfo,
                                    gameId: question.meta.gameId,
                                    correct: question.options.correct,
                                    timeSpent: gameInfo.timePerQuestion - (question.stats.remainingTime || 0),
                                    selectedAnswer: question.stats.selectedAnswer || question.options.correct // Hack: so empty answer won't show up
                                };
                            }).reduce(function (prev, curr) {
                                if (!_getWrongOptions(curr.correct, curr.selectedAnswer)) {
                                    prev.totalGotRight++;
                                }

                                if (curr.timeSpent < prev.shortestTime) {
                                    prev.shortestTime = curr.timeSpent;
                                }

                                if (curr.timeSpent > prev.longestTime) {
                                    prev.longestTime = curr.timeSpent;
                                }

                                prev.totalTime += curr.timeSpent;

                                var studentIndex = _checkIdExists(prev.studentStats, curr.user.id);
                                if (studentIndex !== -1) {
                                    var listIndex = _checkIdExists(prev.studentStats[studentIndex].listsPlayed, curr.list.id);
                                    if (listIndex !== -1) {
                                        prev.studentStats[studentIndex].listsPlayed[listIndex].gotWrong = _getWrongOptions(
                                            curr.correct, curr.selectedAnswer,
                                            prev.studentStats[studentIndex].listsPlayed[listIndex].gotWrong
                                        );
                                        prev.studentStats[studentIndex].listsPlayed[listIndex].playCount++;
                                    } else {
                                        var newStats = {
                                            id: curr.list.id,
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
                                        id: curr.user.id,
                                        name: curr.user.name,
                                        email: curr.user.email,
                                        listsPlayed: [{
                                            id: curr.list.id,
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

                                var listIndex = _checkIdExists(prev.listStats, curr.list.id);
                                if (listIndex !== -1) {
                                    if (prev.listStats[listIndex].finishedStudents.indexOf(curr.user.id) === -1) {
                                        prev.listStats[listIndex].finishedStudents.push(curr.user.id);
                                    }

                                    var termIndex = _checkIdExists(prev.listStats[listIndex].terms, curr.correct);
                                    if (termIndex !== -1) {
                                        prev.listStats[listIndex].terms[termIndex].gotWrong = _getWrongStudents(
                                            curr.correct, curr.selectedAnswer, curr.user.id,
                                            prev.listStats[listIndex].terms[termIndex].gotWrong
                                        );
                                    } else {
                                        var newStats = {
                                            id: curr.correct,
                                            gotWrong: _getWrongStudents(curr.correct, curr.selectedAnswer, curr.user.id, [])
                                        };

                                        prev.listStats[listIndex].terms.push(newStats);
                                    }
                                } else {
                                    var newStats = {
                                        id: curr.list.id,
                                        title: curr.list.title,
                                        category: curr.list.category,
                                        finishedStudents: [curr.user.id],
                                        terms: [{
                                            id: curr.correct, gotWrong: _getWrongStudents(curr.correct, curr.selectedAnswer, curr.user.id, [])
                                        }]
                                    };

                                    prev.listStats.push(newStats);
                                }

                                if (curr.correct !== curr.selectedAnswer) {
                                    var correctTermIndex = _checkIdExists(prev.termStats, curr.correct);
                                    if (correctTermIndex !== -1) {
                                        prev.termStats[correctTermIndex].count++;
                                    } else {
                                        prev.termStats.push({ id: curr.correct, count: 1 });
                                    }

                                    wrongTermIndex = _checkIdExists(prev.termStats, curr.selectedAnswer);
                                    if (wrongTermIndex !== -1) {
                                        prev.termStats[wrongTermIndex].count++;
                                    } else {
                                        prev.termStats.push({ id: curr.selectedAnswer, count: 1 });
                                    }
                                }

                                return prev;
                            }, {
                                totalStudents: classObj.students.length,
                                totalLists: classObj.lists.length,
                                totalTerms: lists.reduce(function (prev, curr) { prev += curr.terms.length; return prev; }, 0),
                                totalGames: games.length,
                                totalUniqQuestions: _.uniq(questions.map(function (q) { return q.options.correct; })).length,
                                totalQuestions: questions.length,
                                totalGotRight: 0,
                                totalTime: 0,
                                shortestTime: 20,
                                longestTime: 0,
                                studentStats: [],
                                listStats: [],
                                termStats: []
                            })); // Reduce
                        }); // Question
                    }); // Game
                }); // User
            }); // List
        }); // Class
    }

    function getListStats (id, cb) {
        cb(null, {});
    }

    function getStudentStats (id, cb) {
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

    function _getInfoByUserId (users, userId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                return {
                    id: userId,
                    name: users[i].name,
                    email: users[i].email
                };
            }
        }

        return {
            id: null,
            name: null,
            email: null
        };
    }

    function _getInfoByListId (lists, listId) {
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === listId) {
                return {
                    id: listId,
                    title: lists[i].title,
                    category: lists[i].category
                }
            }
        }

        return {
            id: null,
            title: null,
            category: null
        };
    }

    function _getInfoByGameId (games, gameId) {
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
        getStudentStats: getStudentStats,
        updateGameStats: updateGameStats,
        updateQuestionStats: updateQuestionStats
    };
})();
