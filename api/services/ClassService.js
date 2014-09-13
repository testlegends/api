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
        // TODO: Danger! Potential async problem
        Class.find({}, function (err, data) {
            var classes = data.filter(function (classObj) {
                return classObj.meta.userId === params.userId || _indexOf(classObj.students, 'id', params.userId) !== -1
            });

            cb(null, classes);
        });
    }

    function create (params, cb) {
        var lists = params.lists.map(function (list) {
            return { id: list };
        });

        Class.create({
            name: params.name,
            desc: params.desc,
            lists: lists,
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
            User.findOneByEmail(params.email, function (err, user) {
                if (!user) {
                    cb('Student not found');
                    return;
                }

                if (_indexOf(data.students, 'id', user.id) === -1) {
                    data.students.push({
                        id: user.id
                    });

                    data.save()
                    cb(null, user);
                } else {
                    cb('Student already in the class')
                }
            });
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

    function addLists (params, cb) {
        Class.findOneById(params.id, function (err, data) {
            List.find({
                id: params.lids
            }, function (err, lists) {
                if (!lists) {
                    cb('Lists not found');
                    return;
                }

                lists.forEach(function (list) {
                    if (_indexOf(data.lists, 'id', list.id) === -1) {
                        data.lists.push({
                            id: list.id
                        });

                        data.save();
                    }
                });

                cb(null, lists);
            });
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

    function _indexOf(arr, key, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == val) {
                return i;
            }
        }

        return -1;
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
        addLists: addLists,
        removeList: removeList
    };
})();
