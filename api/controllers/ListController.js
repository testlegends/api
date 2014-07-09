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
        var title = req.body.title;
        var desc = req.body.desc;
        var creatorId = req.body.quizlet === 1 ? 1 : userId;
        var terms = req.body.terms;

        List.create({
            title: title,
            desc: desc,
            terms: terms,
            meta: {
                creatorId: creatorId,
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
        var terms = req.body.terms;

        List.update({
            id: listId
        }, {
            title: title,
            desc: desc,
            terms: terms
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

    function remove (req, res) {

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
