/**
 * lists_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/07/06
 */

var frisby = require('frisby');
var q = require('q');

var oauthServerUrl = 'https://leejefon.local:1338';
var apiServerUrl = 'https://leejefon.local:1339';

init();

function init () {
    var deferred = Q.defer();

    OAuthLogin()
        .then(GetLists)
        .then(CreateList)
        .then(UpdateList)
        .then(DeleteList)
        .then(function () {
            deferred.resolve();
        })
        .done();

    return deferred.promise;
}

function OAuthLogin () {
    var deferred = Q.defer();

    frisby.create('OAuth2 login')
        .post(oauthServerUrl + '/oauth/token', {
            username: 'q@q.cc',
            password: 'fu041u03',
            client_id: '53562b9335e2e5c84c0001fa',
            grant_type: 'password'
        })
        .expectStatus(200)
        .afterJSON(function (response) {
            deferred.resolve();

            frisby.globalSetup({ // globalSetup is for ALL requests
                request: {
                    'headers': { 'Authorization': response.token_type + ' '+ response.access_token },
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        })
        .toss();

    return deferred.promise;
}

function GetLists () {
    var deferred = Q.defer();

    frisby.create('Get Lists')
        .get(apiServerUrl + '/lists')
        .expectStatus(200)
        .expectJSONLength('data', 2)
        .afterJSON(function (response) {
            deferred.resolve();
        })
        .toss();

    return deferred.promise;
}

function CreateList () {
    var deferred = Q.defer();

    frisby.create('Create List')
        .put(apiServerUrl + '/lists', {
            title: 'Test List',
            desc: 'Test Description',
            terms: [
                {
                    term: 'g',
                    definition: 'Gravitational Force'
                }
            ]
        }, { json: true })
        .expectStatus(200)
        .expectJSON({
            status: 'OK',
            data: {
                title: 'Test List',
                desc: 'Test Description',
                terms: [
                    {
                        term: 'g',
                        definition: 'Gravitational Force'
                    }
                ]
            }
        })
        .afterJSON(function (response) {
            deferred.resolve(response);
        })
        .toss();

    return deferred.promise;
}

function UpdateList (result) {
    var deferred = Q.defer();

    frisby.create('Update List')
        .post(apiServerUrl + '/list/' + response.data.id, {
            title: 'Test List Updated',
            desc: 'Test Description Updated',
            terms: [
                {
                    term: 'm',
                    definition: 'meter'
                }
            ]
        }, { json: true })
        .expectStatus(200)
        .expectJSON({
            status: 'OK',
            data: {
                id: response.id,
                title: 'Test List Updated',
                desc: 'Test Description Updated',
                terms: [
                    {
                        term: 'm',
                        definition: 'meter'
                    }
                ]
            }
        })
        .afterJSON(function (response) {
            deferred.resolve(response);
        })
        .toss();

    return deferred.promise;
}

function DeleteList (result) {
    var deferred = Q.defer();

    frisby.create('Delete List')
        .delete(apiServerUrl + '/list/' + response.data.id)
        .expectStatus(200)
        .expectJSON({
            status: 'OK'
        })
        .afterJSON(function (response) {
            deferred.resolve();
        })
        .toss();

    return deferred.promise;
}
