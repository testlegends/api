/**
 * ClassController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/21
 */

module.exports = (function () {

    function index (req, res) {
        ClassService.list({
            userId: req.user.id
        }, function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function create (req, res) {
        ClassService.create({
            name: req.body.name,
            desc: req.body.desc,
            userId: req.user.id
        }, function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function find (req, res) {
        ClassService.find({
            id: req.param('id')
        }, function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function remove (req, res) {
        var id = req.param('id');

        ClassService.destroy({
            id: id
        }, function (err) {
            return res.json({
                status: 'OK'
            });
        });
    }

    function getStudents (req, res) {
        var id = req.param('id');

        ClassService.getStudents({
            id: id
        }, function (err, students) {
            return res.json({
                status: 'OK',
                data: students
            });
        });
    }

    function addStudent (req, res) {
        var id = req.param('id');
        var email = req.body.email;

        ClassService.addStudent({
            id: id,
            email: email
        }, function (err, data) {
            if (err) {
                return res.json({
                    status: 'ERROR',
                    data: err
                });
            }

            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function findStudent (req, res) {
        return res.json({
            status: 'OK'
        });
    }

    function removeStudent (req, res) {
        var id = req.param('id');
        var sid = req.param('sid');

        ClassService.removeStudent({
            id: id,
            sid: sid
        }, function (err, data) {
            return res.json({
                status: 'OK'
            });
        });
    }

    function getLists (req, res) {
        var id = req.param('id');

        ClassService.getLists({
            id: id
        }, function (err, lists) {
            return res.json({
                status: 'OK',
                data: lists
            });
        });
    }

    function addList (req, res) {
        var id = req.param('id');
        var lid = req.body.listId;

        ClassService.addList({
            id: id,
            lid: lid
        }, function (err, data) {
            if (err) {
                return res.json({
                    status: 'ERROR',
                    data: err
                });
            }
            
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function findList (req, res) {
        return res.json({
            status: 'OK'
        });
    }

    function removeList (req, res) {
        var id = req.param('id');
        var lid = req.param('lid');

        ClassService.removeList({
            id: id,
            lid: lid
        }, function (err, data) {
            return res.json({
                status: 'OK'
            });
        });
    }

    return {
        index: index,
        create: create,
        find: find,
        remove: remove,

        getStudents: getStudents,
        addStudent: addStudent,
        findStudent: findStudent,
        removeStudent: removeStudent,

        getLists: getLists,
        addList: addList,
        findList: findList,
        removeList: removeList,

        _config: {}
    };

})();
