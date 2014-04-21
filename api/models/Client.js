
module.exports = {

    connection: 'mongodb_dev',

    tableName: 'clients',

    attributes: {
        id: {
            type: 'integer'
        },
        name: {
            type: 'string'
        },
        clientId: {
            type: 'string'
        },
        clientSecret: {
            type: 'string'
        }
    }
};
