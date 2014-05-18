/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

// Just for the fields, the real Client model is in home

module.exports = {

    connection: 'mongodb_dev',

    tableName: 'clients',

    attributes: {
        name: {
            type: 'string'
        },

        clientSecret: {
            type: 'string'
        },

        userId: {
            type: 'string'
        },

        redirectURI: {
            type: 'json'
        },

        icon: {
            type: 'string'
        }
    }
};

var example = {

    name: 'TestLegends Build',

    clientSecret: 'whatever',

    userId: '1',

    redirectURI: {
        protocol: 'http',
        domain: 'build.testlegends.com'
    },

    icon: 'icon.png'
};
