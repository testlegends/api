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
        }
    }

};

var example = {

    name: 'Sword'

};
