/**
 * Game Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/07/30
 */

var validator = require('validator');

module.exports = (function(){

    function generateFromList (params, cb) {
        var termsPerStage = 8;

        List.findOne({ id: params.listId }, function (err, list) {
            if (err) {
                cb(err, null);
                return;
            }

            Game.create({
                name: list.title,
                settings: {
                    timer: params.timer,
                    heroHealth: params.heroHealth,
                    theme: 'forest',
                    scope: 'public',
                    status: 'published'
                },
                meta: {
                    creatorId: list.meta.userId,
                    listId: params.listId
                }
            }, function (err, game) {
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }

                _getTerms(list, termsPerStage).forEach(function (term, index) {
                    Question.create({
                        content: term.definition,
                        options: {
                            correct: term.term,
                            wrong: _getRandomOptions(list.terms, term, termsPerStage)
                        },
                        meta: {
                            gameId: game.id,
                            order: index
                        }
                    }, function(err, question) {
                        if (err) {
                            console.log(err);
                        }

                        return cb(null, game);
                    });
                });
            });
        });
    }

    function _getTerms (list, maxTerms) {
        var num = maxTerms || 20;
        return list.terms.slice(0, num);
    }

    function _getRandomOptions (allTerms, term, maxTerms) {
        var num = maxTerms || 20;
        var predefinedOptionsLength = term.options.length;
        var totalTerms = allTerms.length > num ? num : allTerms.length;

        if (predefinedOptionsLength < 3) {
            var existingOptions = term.options.map(function (option) { return option.text; });
            existingOptions.push(term.term);

            for (var i = predefinedOptionsLength; i < 3; i++) {
                var newOption = allTerms[Math.floor(Math.random() * totalTerms)].term;
                if (existingOptions.indexOf(newOption) === -1) {
                    term.options.push({ text: newOption });
                } else {
                    --i;
                }
            }

            return term.options;
        } else {
            return term.options.slice(0, 3);
        }
    }

    return {
        generateFromList: generateFromList
    };
})();
