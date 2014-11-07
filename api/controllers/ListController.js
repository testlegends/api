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
        // login as
        if (req.query.loginAs && req.user.role === 'admin') {
            User.findOneByEmail(req.query.loginAs, function (err, user) {
                if (user) {
                    List.find({
                        or: [
                            { 'meta.userId': user.id },
                            { 'meta.creatorId': user.id }
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
                } else {
                    return res.json({
                        status: 'ERROR',
                        data: 'User not found'
                    });
                }
            });
        } else {
            List.find({
                or: [
                    { 'meta.userId': req.user.id },
                    { 'meta.creatorId': req.user.id }
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
    }

    function create (req, res) {
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

        // login as
        if (req.query.loginAs && req.user.role === 'admin') {
            User.findOneByEmail(req.query.loginAs, function (err, user) {
                if (user) {
                    List.create({
                        title: title,
                        desc: desc,
                        category: category,
                        terms: terms,
                        meta: {
                            oldListId: oldListId,
                            userId: user.id
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
                } else {
                    return res.json({
                        status: 'ERROR',
                        data: 'User not found'
                    });
                }
            });
        } else {
            List.create({
                title: title,
                desc: desc,
                category: category,
                terms: terms,
                meta: {
                    oldListId: oldListId,
                    userId: req.user.id
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
