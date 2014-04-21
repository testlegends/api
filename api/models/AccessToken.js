
module.exports = {

    adapter: 'mongodb_dev',

    tableName: 'access_tokens',

    attributes: {
        userId: {
            type: 'integer'
        },
        clientId: {
            type: 'integer'
        },
        token: {
            type: 'string'
        }
    }
};
