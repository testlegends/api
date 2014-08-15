/**
 * ListController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/06/24
 */

module.exports = (function () {

    function index (req, res) {
        var userId = req.user.id;

        List.find({
            or: [
                { 'meta.userId': userId },
                { 'meta.creatorId': userId }
            ]
        }, function (err, lists) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: lists
            });
        });
    }

    function create (req, res) {
        var userId = req.user.id;
        var oldListId = req.body.oldListId;
        var title = req.body.title;
        var desc = req.body.desc;
        var category = req.body.category;
        var terms = req.body.terms.map(function (term) {
            return {
                term: term.term,
                definition: term.definition,
                options: term.options || []
            };
        });

        List.create({
            title: title,
            desc: desc,
            category: category,
            terms: terms,
            meta: {
                oldListId: oldListId,
                userId: userId
            }
        }, function (err, list) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: list
            });
        });
    }

    function find (req, res) {
        var listId = req.param('id');

        List.findOneById(listId, function (err, list) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: list
            });
        });
    }

    function update (req, res) {
        var listId = req.param('id');
        var title = req.body.title;
        var desc = req.body.desc;
        var category = req.body.category;
        var terms = req.body.terms;

        List.update({
            id: listId
        }, {
            title: title,
            desc: desc,
            category: category,
            terms: terms
        }, function (err, list) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: list[0]
            });
        });
    }

    function remove (req, res) {
        var listId = req.param('id');

        List.destroy({
            id: listId
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
