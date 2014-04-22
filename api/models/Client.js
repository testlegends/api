
module.exports = {

    connection: 'mongodb_dev',

    tableName: 'clients',

    attributes: {
        name: {
            type: 'string'
        },
        clientSecret: {
            type: 'string'
        }
    }
};
