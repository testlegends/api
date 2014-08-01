/**
 * Game Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/07/30
 */

module.exports = (function(){

    function generateFromList (list, cb) {
        Game.create({
            name: list.title,
            meta: {
                creatorId: list.meta.userId,
                scope: 'public',
                status: 'draft'
            }
        }, function (err, game) {
            if (err) {
                console.log(err);
                return cb(err, null);
            }

            _getTwentyTerms(list).forEach(function (term, index) {
                Question.create({
                    difficulty: 'easy',
                    type: 'multiple_choice',
                    content: term.definition,
                    options: {
                        correct: term.term,
                        wrong: _getRandomOptions(list.terms, term)
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
    }

    function _getTwentyTerms (list) {
        return list.terms.slice(0, 20);
    }

    function _getRandomOptions (allTerms, term) {
        var predefinedOptionsLength = term.options.length;
        var totalTerms = allTerms.length > 20 ? 20 : allTerms.length;

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
