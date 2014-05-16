/**
 * Item
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

module.exports = {

    tableName: 'items',

    attributes: {
        name: {
            type: 'string',
            required: true
        },

        meta: {
            type: 'json',
            defaultsTo: {}
        }
    }

};

var example = {

    name: 'Sword',

    meta: {
        hp: -10,
        attack: 5
    }

};
