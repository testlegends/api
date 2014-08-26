/**
 * Class Service
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/21
 */

var validator = require('validator');

module.exports = (function(){

    function list(params, cb) {
        Class.find({
            'meta.userId': params.userId
        }, function (err, data) {
            cb(null, data);
        });
    }

    function create (params, cb) {
        Class.create({
            name: params.name,
            desc: params.desc,
            meta: {
                userId: params.userId
            }
        }, cb);
    }

    function find (params, cb) {
        Class.findOneById(params.id, cb);
    }

    function destroy (params, cb) {
        Class.destroy({
            id: params.id
        }, function (err) {
            cb(null);
        });
    }

    function getStudents (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            var studentIds = data.students.map(function (student) {
                return student.id;
            });

            User.find({
                id: studentIds
            }, function (err, students) {
                cb(null, students);
            });
        });
    }

    function addStudent (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            // TODO: need to check if student already exists
            data.students.push({
                id: params.sid
            });

            data.save(cb);
        });
    }

    function removeStudent (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            data.students = data.students.filter(function(student) {
                return student.id !== params.sid
            });

            data.save(cb);
        });
    }

    function getLists (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            var listIds = data.lists.map(function (list) {
                return list.id;
            });

            List.find({
                id: listIds
            }, function (err, lists) {
                cb(null, lists);
            });
        });
    }

    function addList (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            // TODO: need to check if list already exists
            data.lists.push({
                id: params.lid
            });

            data.save(cb);
        });
    }

    function removeList (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            data.lists = data.lists.filter(function(list) {
                return list.id !== params.lid
            });

            data.save(cb);
        });
    }

    return {
        list: list,
        create: create,
        find: find,
        destroy: destroy,

        getStudents: getStudents,
        addStudent: addStudent,
        removeStudent: removeStudent,

        getLists: getLists,
        addList: addList,
        removeList: removeList
    };
})();
