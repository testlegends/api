/**
 * Delete User Script
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/09/16
 */

var MongoClient = require('mongodb').MongoClient;
var iniparser = require('iniparser');
var _ = require('underscore');
var test_data = require('./test_data.js');

process.on('SIGINT', function() {
    process.exit(0);
});

iniparser.parse('.env', function(err, data){
    if (err) {
        console.log(err);
        process.exit(0);
    }

    if (data.NODE_ENV !== 'development') {
        console.log("The script is for development only!");
        process.exit(0);
    }

    var email = process.argv[2];

    MongoClient.connect(data.MONGOHQ_URL, function (err, db) {
        if (err) {
            throw err;
        }

        if (email) {

        } else {
            console.log('E-mail is required');
        }
    });
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
